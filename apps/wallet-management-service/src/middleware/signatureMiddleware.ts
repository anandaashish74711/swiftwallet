
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';



export const generateSignature = (req: Request, res: Response, next: NextFunction) => {
    const { userId, amount } = req.body; // Assuming these are sent in the request body
    const timestamp = Date.now();
    const nonce = crypto.randomBytes(16).toString('hex'); // Generate a unique nonce
    const sharedSecret = process.env.SHARED_SECRET as string; // Store your shared secret in environment variables

    // Create the signature
    const data = `${userId}:${amount}:${timestamp}:${nonce}`;
    const hmac = crypto.createHmac('sha256', sharedSecret);
    hmac.update(data);
    const signature = hmac.digest('hex');

    // Attach signature and other details to the request
    req.signature = signature;
    req.timestamp = timestamp;
    req.nonce = nonce;

    next(); // Proceed to the next middleware or route handler
};
