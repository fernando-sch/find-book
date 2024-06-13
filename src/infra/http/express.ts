import express, { Application } from 'express';
import cors from 'cors';

class Express {
  app: Application;

  constructor() {
    this.app = express();
  }

  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  listen() {
    this.app.listen(4000, () => console.log('Server is running at port 4000'));
  }
}

export default Express;
