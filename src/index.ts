import { InternalServerError } from "@meemsd/common";
import { app, port } from "./app";
import "express-async-errors";

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`category-api listening at http://localhost:${port}`);
    });
  } catch (error) {
    throw new InternalServerError();
  }
};

start();
