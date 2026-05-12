import nodemailer from "nodemailer";
import User from "@/app/models/userModel";
import bcrypt from "bcryptjs";

interface EmailParams {
    email: string;
    emailType: "VERIFY" | "RESET";
    userId: string;
}

export const sendEmail = async ({
    email,
    emailType,
    userId,
}: EmailParams) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODE_MAILER_USER,
                pass: process.env.NODE_MAILER_PASS,
            },
        });

        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject:
                emailType === "VERIFY"
                    ? "Verify your email"
                    : "Reset your password",

            html: `
        <h2>${emailType === "VERIFY"
                    ? "Verify Your Email"
                    : "Reset Password"
                }</h2>

              
        <p>
          Click 
          <a href="${process.env.DOMAIN}/${emailType === "VERIFY"
                    ? "verifyemail"
                    : "resetpassword"}?token=${hashedToken}">
            here
          </a>
          to ${emailType === "VERIFY"
                    ? "verify your email"
                    : "reset your password"
                }
        </p>

        <p>This link expires in 1 hour.</p>
      `,
        };

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;

    } catch (error) {
        throw new Error("Email not sent");
    }
};