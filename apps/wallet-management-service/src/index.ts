import express ,{ Application, Request, Response} from 'express'
const app: Application = express();
const PORT = process.env.PORT || 5000;
import cors from 'cors';
import walletRoute from './routes/wallet.route';
import otpsend from './routes/otp.route'
// Middleware to parse JSON requests
app.use(express.json());
app.use(cors())

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the Express server!');
});
app.use('/api', walletRoute);

app.use('/api',otpsend);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
