import { inngest } from "./client.js";
import { User } from "../models/User.js"
import { NonRetriableError } from "inngest";
import { sendMail } from "../utils/mailer.js"

export const onUserSignup = inngest.createFunction(
    { id: "on-user-signup", retries: 2 },//inngest config ,metadata
    { event: "user/signup" },//event trigger
    async ({ event, steps }) => {
        try {
            const email = event.data;
            const user = await steps.run("get-user-email", async () => {
                const userObject = await User.findOne({ email });
                if (!userObject) {
                    throw new NonRetriableError("User no longer exist in our database");
                }
                return userObject
            })

            await steps.run("send-welcome-email", async () => {
                const subject = `Welcome to the app`
                const message = `Hi
                \n\n
                Thanks for signing up. We'er glad to have you onboard!
                `
                await sendMail(user.email, subject, message);
            })

            return { sucess: true };
        
        } catch (error) {
        
            console.log("❌ Error running steps", error.message);
        
        }
    }
);