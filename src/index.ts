import * as dotenv from 'dotenv';
import express from 'express';
import connectToMongoDB from './config/db';
import bookRoutes from './routes/book';

const app = express();

app.use(bookRoutes);

dotenv.config();

app.use(express.json());

const port: string = (process.env.PORT as string);

const startServer = async () => {
  try {
    await connectToMongoDB();

    // Additional setup or routes can be added here

    app.get('/', (req, res) => {
      res.send('Blackhole EMS');
    });

    app.listen(port, () => {
      console.log(`Express is listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();