import { inngest } from "../client.js";
import Ticket from "../../models/ticket.js";
import { NonRetriableError } from "inngest";
import analyzeTicket from "../../utils/ai.js";
import User from "../../models/User.js";
import { sendMail } from "../../utils/mailer.js";

export const onTicketCreated = inngest.createFunction(
    { id: 'on-ticket-created', retries: 2 },
    { event: "ticket/created" },
    async ({ event, step }) => {
        try {
            const { ticketId } = event.data;

            const ticket = await step.run("fetch-ticket", async () => {
                const ticketObject = await Ticket.findById(ticketId);
                if (!ticketObject) {
                    throw new NonRetriableError("Ticket not found");
                }
                return ticketObject;
            });

            await step.run('update-ticket-status-todo', async () => {
                await Ticket.findByIdAndUpdate(ticket._id, { status: "TODO" });
            });

            const aiResponse = await step.run("analyze-ticket", async () => {
                return await analyzeTicket(ticket);
            });

            const moderator = await step.run('assign-moderator-and-update-ticket', async () => {
                let user;
                const skills = aiResponse?.relatedSkills || [];

                if (skills.length > 0) {
                    user = await User.findOne({
                        role: "moderator",
                        skills: {
                            $in: skills.map(skill => new RegExp(skill, "i"))
                        },
                    });
                }

                if (!user) {
                    user = await User.findOne({ role: "admin" });
                }
                
                // **FIX: Single, consolidated update**
                if (user) {
                    await Ticket.findByIdAndUpdate(ticket._id, {
                        priority: !["low", "medium", "high"].includes(aiResponse?.priority)
                            ? "medium"
                            : aiResponse.priority,
                        helpfulNotes: aiResponse?.helpfulNotes,
                        relatedSkills: aiResponse?.relatedSkills,
                        assignedTo: user._id,
                        status: "IN_PROGRESS",
                    });
                }
                
                return user;
            });

            await step.run('send-email-notification', async () => {
                if (moderator) {
                    const finalTicket = await Ticket.findById(ticket._id);
                    await sendMail(moderator.email, "Ticket Assigned", `A new ticket has been assigned to you: ${finalTicket.title}`);
                }
            });

            return { success: true };

        } catch (error) {
            console.error("❌ Error running the on-ticket-created function", error.message);
            return { success: false, error: error.message };
        }
    }
);