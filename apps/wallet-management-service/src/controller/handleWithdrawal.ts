import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';


const prisma = new PrismaClient();


export const handleWithdrawal = async (req: Request, res: Response) => {
  try {
    const { email, otp, amount } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });
if (!user) {
    return res.status(404).json({ message: 'User not found.' });
}
const userId = user.id;

    console.log('Request email:', email);

    // Fetch the OTP record from the database
    const dbValue = await prisma.otp.findUnique({
      where: { email },
    });

    console.log('DB OTP record:', dbValue);
   
    // Check if OTP exists
    if (!dbValue) {
      return res.status(404).json({ message: 'OTP not found or already used.' });
    }

    // Check if OTP matches and is not expired
    const isOtpValid = dbValue.otp === otp;
    const isOtpExpired = new Date() > dbValue.expiresAt;

    if (!isOtpValid) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    if (isOtpExpired) {
      await prisma.otp.delete({
        where: { email },
      });
      return res.status(400).json({ message: 'OTP has expired.' });
    }

    console.log('userId being used in query:', userId);
const wallet = await prisma.wallet.findUnique({
  where: { userId },
});

   

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found.' });
    }
    const num = Number(amount);
 
   
    const newBalance = wallet.balance + num;

    // Perform the wallet update and OTP deletion within a transaction
    const [updatedWallet] = await prisma.$transaction([
      prisma.wallet.update({
        where: { userId },
        data: { balance: newBalance },
      }),
      prisma.otp.delete({ where: { email } }),
    ]);

    console.log('Updated wallet:', updatedWallet);

    // Respond with success
    return res.status(200).json({
      message: ' successful.',
      newBalance: updatedWallet.balance,
    });
  } catch (error) {
    console.error('Error handling withdrawal:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
