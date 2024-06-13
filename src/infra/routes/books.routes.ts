import { Router } from "express";
import { BooksController } from "../../app/controllers/books.controller";
import { routerAdapter } from "./router.adapter";

export const BookRoutes = (router: Router) => {
  const booksControler = new BooksController();

  router.post("/books", routerAdapter(booksControler, "create"));
};
