
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandllers';
import notFound from './app/middlewares/notFound';
import { rootRouter } from './app/routes';
import cookieParser from 'cookie-parser';
// const {Request} from express
const app: Application = express();

//--------->parsers

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

///application route 

app.use('/api/v1', rootRouter)



const testRoute = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
}

app.get('/', testRoute)

app.use(globalErrorHandler) //add global handler

app.use(notFound) // for not fount route




export default app;
