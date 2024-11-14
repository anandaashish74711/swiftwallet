
import express, { Request, Response } from 'express';


const route = express.Router();

route.post('/deposit', (req: Request, res: Response) => {
    res.send('Deposit endpoint');
});

route.post('/withdraw', (req: Request, res: Response) => {
    res.send('Withdrawal endpoint');
});

export default route;
