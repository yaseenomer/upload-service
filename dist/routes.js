"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.upload = void 0;
const common_1 = require("@meemsd/common");
const express_1 = require("express");
require("express-async-errors");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}${uniqueSuffix}${path_1.default
            .extname(file.originalname)
            .toLowerCase()}`);
    },
});
exports.upload = (0, multer_1.default)({
    storage: storage,
});
const router = (0, express_1.Router)();
exports.router = router;
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).send("welcome to upload service");
    }
    catch (error) {
        throw new common_1.InternalServerError();
    }
}));
router.post("/upload", exports.upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        if (!req.file)
            throw new common_1.NotFoundError();
        return res.status(201).json({ file });
    }
    catch (error) {
        throw new common_1.InternalServerError();
    }
}));
router.post("/uploads", exports.upload.array("files"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.files;
        if (!fields || (fields === null || fields === void 0 ? void 0 : fields.length) == 0)
            throw new common_1.NotFoundError();
        let files = [];
        if (fields instanceof Array) {
            files = fields.map((file) => file.filename);
        }
        return res.status(201).json({ files });
    }
    catch (error) {
        throw new common_1.InternalServerError();
    }
}));
router.get("/:file", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { file } = req.params;
        res.status(200).sendFile(path_1.default.join(__dirname, "../uploads", file));
    }
    catch (error) {
        return res.status(500).json(JSON.stringify(error));
    }
}));
//# sourceMappingURL=routes.js.map