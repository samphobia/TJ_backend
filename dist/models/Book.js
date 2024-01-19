"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/book.ts
const mongoose_1 = __importStar(require("mongoose"));
const KeyContentSchema = new mongoose_1.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
});
const BookSchema = new mongoose_1.Schema({
    image: { type: String, required: true },
    banner: { type: String, required: true },
    catchStatement: { type: String, required: true },
    text: { type: String, required: true },
    authorsWord: { type: String, required: true },
    content1: { type: String, required: true },
    image1: { type: String, required: true },
    content2: { type: String, required: true },
    image2: { type: String, required: true },
    link: { type: String, required: true },
    bookTitle: { type: String, required: true },
    bookKeyContents: { type: [KeyContentSchema], required: true },
});
const BookModel = mongoose_1.default.model('Book', BookSchema);
exports.default = BookModel;
//# sourceMappingURL=Book.js.map