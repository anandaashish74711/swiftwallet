
import { Request, Response } from 'express';

export const handleDeposit = async (req: Request, res: Response) => {
    const { amount } = req.body;

    try {
        
const redirectUrl = `http://localhost:3000/bank`;

        res.status(200).json({ redirectUrl });
    } catch (error) {
        console.error('Error processing deposit:', error);
        res.status(500).json({ message: 'Deposit failed' });
    }
};
