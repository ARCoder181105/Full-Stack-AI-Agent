import { inngest } from "../client.js";
import { sendMail } from "../../utils/mailer.js";

export const onUserSignup = inngest.createFunction(
  { id: "on-user-signup", retries: 2 },
  { event: "user/signup" },
  async ({ event, step }) => {
    const { email } = event.data;

    await step.run("send-welcome-email", async () => {
      const subject = `Welcome to the app`;
      const message = `Hi \n\nThanks for signing up. We're glad to have you onboard!`;
      
      await sendMail(email, subject, message);
    });

    return { success: true, message: `Welcome email sent to ${email}` };
  }
);