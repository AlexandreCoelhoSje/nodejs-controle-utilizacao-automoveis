import "reflect-metadata";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { handleRequestError } from "./middlewares/handleRequestError";

import { router } from "./routes";
import "./database";

const app = express();

app.use(express.json());

app.use(router);

app.use(handleRequestError);

//const server = app.listen(3000, () => console.log('server is running again'));

//export { app, server }

export { app }