import express from "express";
import { app } from "app";

type RenderPartial = (viewPath: string, data?: any) => Promise<void>;

type HandlerHelpers = {
  renderPartial: RenderPartial;
  renderPage: RenderPartial;
};

type HandlerCallback = (
  helpers: HandlerHelpers,
  req: express.Request,
  res: express.Response
) => Promise<void>;

const handleRequest = (
  res: express.Response,
  template: boolean,
  viewPath: string,
  data: any = {}
) => {
  return new Promise<void>((resolve, reject) => {
    res.render(
      viewPath,
      {
        ...data,
        template,
      },
      (error, html) => {
        if (error) {
          console.error(error);
          res.status(500);
          res.setHeader("Content-Type", "text/html");
          res.send("<h2>Something went wrong</h2>");
          reject(error);
        } else {
          res.status(200);
          res.setHeader("Content-Type", "text/html");
          res.send(html);
          resolve();
        }
        return true;
      }
    );
  });
};

const handleVerb = (
  res: express.Response,
  req: express.Request,
  handlerCallback: HandlerCallback
) => {
  const renderPage: RenderPartial = (viewPath, data) => {
    return handleRequest(res, true, viewPath, data);
  };
  const renderPartial: RenderPartial = (viewPath, data) => {
    return handleRequest(
      res,
      false,
      viewPath.startsWith("partials") ? viewPath : `partials/${viewPath}`,
      data
    );
  };
  handlerCallback({ renderPartial, renderPage }, req, res);
};

export function post(path: string, handlerCallback: HandlerCallback) {
  app.post(path, (req, res) => handleVerb(res, req, handlerCallback));
}

export function put(path: string, handlerCallback: HandlerCallback) {
  app.put(path, (req, res) => handleVerb(res, req, handlerCallback));
}

export function get(path: string, handlerCallback: HandlerCallback) {
  app.get(path, (req, res) => handleVerb(res, req, handlerCallback));
}

export function del(path: string, handlerCallback: HandlerCallback) {
  app.delete(path, (req, res) => handleVerb(res, req, handlerCallback));
}
