import { NextFunction, Request, Response } from "express";
import { HttpRequest } from "../http/http.adapter";
import { errorMiddleware } from "../middlewares/error.middleware";

export const routerAdapter = (controller: any, method: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: req?.body,
      headers: req?.headers,
      params: req?.params,
      query: req?.query,
    };

    const httpResponse = await controller[method](httpRequest);
    const isSuccess = httpResponse.status >= 200 && httpResponse <= 299;

    if (isSuccess) {
      return res.status(httpResponse.status).json(httpResponse);
    } else {
      return errorMiddleware(httpResponse, req, res, next);
    }
  };
};
