"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const routes_1 = require("./routes");
const common_1 = require("@meemsd/common");
require("express-async-errors");
require("dotenv").config();
const app = (0, express_1.default)();
exports.app = app;
// app.use(json());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use((0, cors_1.default)());
app.use("/", routes_1.router);
app.all("*", () => {
    throw new common_1.NotFoundError();
});
app.use(common_1.errorHandlerMiddleware);
const port = process.env.PORT || 4000;
exports.port = port;
//# sourceMappingURL=app.js.map