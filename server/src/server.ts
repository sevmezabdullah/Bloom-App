import express from 'express';
import connectToDatabase from './db';
import userRoutes from './routes/user.routes';
import { categoryRoutes } from './routes/category.routes';
import taskRoutes from './routes/task.routes';
import morgan from 'morgan';
const app = express();
const PORT = 1337;

app.use(express.json());
app.use(morgan('dev'));

app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/task', taskRoutes);

app.listen(PORT, () => {
  console.log('Server up and running on ' + PORT);
  connectToDatabase();
});
