import sgmail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const fromEmail = process.env.FROM_EMAIL;

sgmail.setApiKey(process.env.SEND_GRID_API);

export const sendEmail = async (to, subject, html) => {
  const msg = {
    to,
    from: `TaskHive <${fromEmail}>`,
    subject,
    html,
  };

  try {
    await sgmail.send(msg);
    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw new Error("Failed to send email");
    return false;
  }
};
