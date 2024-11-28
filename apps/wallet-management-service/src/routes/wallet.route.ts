
import express, { Request, Response } from 'express';
import {handleDeposit} from '../controller/handleDeposit'
import {handleWithdrawal} from '../controller/handleWithdrawal'


const route = express.Router();

route.post('/deposit',handleDeposit);

route.post('/webhook/verify-otp',handleWithdrawal);


export default route;
