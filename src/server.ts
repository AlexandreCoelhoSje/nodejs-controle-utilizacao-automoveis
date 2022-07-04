import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleRequestError } from "./middlewares/handleRequestError";

import { router } from "./routes";
import "./database";

const app = express();

app.use(express.json());

app.use(router);

app.use(handleRequestError);

export { app }