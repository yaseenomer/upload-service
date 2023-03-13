import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import { router } from "./routes";

import { errorHandlerMiddleware, NotFoundError } from "@meemsd/common";

import "express-async-errors";

require("dotenv").config();

const app = express();

// app.use(json());

app.use(urlencoded({ extended: true }));

app.use(cors());

app.use("/", router);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4004;

export { app, port };
