import "reflect-metadata";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import handleRequestError from "./middlewares/handleRequestError";

import "./database";

const app = express();

app.use(express.json());

app.get('/', async (req, resp) => { resp.send('Hello World!'); });
app.get('/error', async (req, resp) => { throw new Error('Error'); });

app.use(handleRequestError);

app.listen(3000, () => console.log('server is running again'));

export { app }