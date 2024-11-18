"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// const dotenv=require('dotenv').config()
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
app.get('/', (req, res) => {
    res.send("Hello");
});
app.listen(process.env.PORT, () => {
    console.log("Server running on PORT:", process.env.PORT);
});
//# sourceMappingURL=server.js.map