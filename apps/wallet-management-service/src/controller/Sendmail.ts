
const nodemailer = require("nodemailer");
import { Request, Response } from 'express';
import { otpmaker } from '../utils/otpmaker';
import { prisma } from '@repo/db';
// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user:  'rajivesingh8055@gmail.com', 
    pass: 'hoso yuhn wbcd lvlo', 
  },
});

// Express route handler to send email
export async function main(req: Request, res: Response) {
  try {
    // Extract email details from the request body
    const { email } = req.body;
    const otp = otpmaker(6);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    
    await prisma.otp.upsert({
      where: { email },
      update: { otp, expiresAt },
      create: { email, otp,expiresAt },
    });
    
    // Ensure required fields are present
    if (!email ) {
      return res.status(400).json({ message: 'Missing required fields: to, subject, text, or html.' });
    }

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Nimbo-Makes " <rajivesingh8055@gmail.com>', // Sender address
      to:email, 
      subject:"OTP FOR VERIFICATION", 
      text:otp, 
    });

    // Log and respond with the message ID
    console.log('Message sent: %s', info.messageId);
    return res.status(200).json({ message: 'Email sent successfully', messageId: info.messageId });
  } catch (error:any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}
