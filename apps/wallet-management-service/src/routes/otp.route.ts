import express, { Request, Response } from 'express';
import {main} from '../controller/Sendmail'

const route = express.Router();

route.post('/send-deposit-otp',main);


export default route;