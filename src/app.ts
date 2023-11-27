
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandllers';
// const {Request} from express
const app: Application = express();

//--------->parsers

app.use(express.json());
app.use(cors());

///application route 

app.use('/api/v1/students', studentRoutes)
app.use('/api/v1/users', UserRoutes)



app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});


app.use(globalErrorHandler) //add global handler
export default app;