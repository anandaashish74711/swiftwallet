import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const handleWithdrawal = async (req: Request, res: Response) => {
  try {
    const { email, otp, amount } = req.body;
    console.log(email);

    // Fetch the OTP record from the database
    const dbValue = await prisma.otp.findUnique({
      where: { email },
    });
   console.log(dbValue);
    // Check if OTP exists
    if (!dbValue) {
      return res.status(404).json({ message: 'OTP not found or already used.' });
    }

    // Check if OTP matches and is not expired
    const isOtpValid = dbValue.otp === otp;
    console.log(dbValue.otp);
    const isOtpExpired = new Date() > dbValue.expiresAt;

    if (!isOtpValid) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    if (isOtpExpired) {
      // OTP has expired, delete it
      await prisma.otp.delete({
        where: { email },
      });
      return res.status(400).json({ message: 'OTP has expired.' });
    }

    // If OTP is valid and not expired, proceed with withdrawal logic
    // (e.g., deducting the amount from the user's wallet)
    

    // Delete the OTP after successful verification
    await prisma.otp.delete({
      where: { email },
    });

    // Respond with success
    return res.status(200).json({ message: 'Deposit successful.' });
  } catch (error) {
    console.error('Error handling withdrawal:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
