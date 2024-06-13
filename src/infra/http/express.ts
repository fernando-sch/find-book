import express, { Application } from "express";
import cors from "cors";
import { ErrorMiddleware } from "../middlewares/error.middleware";

class Express {
  app: Application;

  constructor() {
    this.app = express();
    this.initMiddlewares();
    this.errorMiddleware();
  }

  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  private errorMiddleware() {
    this.app.use(ErrorMiddleware);
  }

  listen() {
    this.app.listen(4000, () => console.log("Server is running at port 4000"));
  }
}

export default Express;
