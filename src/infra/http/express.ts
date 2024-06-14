import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { BookRoutes } from "../routes/books.routes";
import { connect } from "../database/mongoose";

dotenv.config();

class Express {
  app: Application;

  constructor() {
    this.app = express();
    this.initMiddlewares();
    this.initRoutes();
  }

  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  private initRoutes() {
    BookRoutes(this.app);
  }

  listen() {
    this.app.listen(4000, () => {
      connect();
      console.log("Server is running at port 4000");
    });
  }
}

export default Express;
