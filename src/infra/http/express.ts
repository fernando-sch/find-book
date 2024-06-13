import express, { Application } from "express";
import cors from "cors";
import { BookRoutes } from "../routes/books.routes";

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
    this.app.listen(4000, () => console.log("Server is running at port 4000"));
  }
}

export default Express;
