import { InternalServerError, NotFoundError } from "@meemsd/common";
import { Router, Request, Response } from "express";
import "express-async-errors";
import multer from "multer";
import path from "path";
import * as fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}${uniqueSuffix}${path
        .extname(file.originalname)
        .toLowerCase()}`
    );
  },
});

export const upload = multer({
  storage: storage,
});

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "welcome to upload service",
    });
  } catch (error) {
    throw new InternalServerError();
  }
});

router.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const file = req.file?.filename;

      if (!req.file) throw new NotFoundError();

      return res.status(201).json({ file });
    } catch (error) {
      throw new InternalServerError();
    }
  }
);

router.post(
  "/uploads",

  upload.array("files"),
  async (req: Request, res: Response) => {
    try {
      const fields = req.files;

      if (!fields || fields?.length == 0) throw new NotFoundError();

      let files: string[] = [];

      if (fields instanceof Array) {
        files = fields.map((file) => file.filename);
      }
      return res.status(201).json({ files });
    } catch (error) {
      throw new InternalServerError();
    }
  }
);

router.get("/:file", async (req: Request, res: Response) => {
  try {
    const { file } = req.params;
    res.status(200).sendFile(path.join(__dirname, "../uploads", file));
  } catch (error) {
    return res.status(500).json(JSON.stringify(error));
  }
});

router.delete("/:file", async (req: Request, res: Response) => {
  try {
    const { file } = req.params;

    fs.unlinkSync(path.join(__dirname, "../uploads", file));

    res.status(200).json({ message: "delete success" });
  } catch (error) {
    return res.status(500).json(JSON.stringify(error));
  }
});

export { router };
