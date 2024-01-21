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
exports.createBlog = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const customeError_1 = require("../utils/customeError");
const errorHandler_1 = require("../middlewares/errorHandler");
// Create a new blog
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, content, image, description } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId; // Assuming you have user information in req.user
        if (!userId) {
            throw new customeError_1.CustomError('Unauthorized - Missing user ID', 404);
        }
        const newBlog = new Blog_1.default({
            title,
            content,
            image,
            description,
            user: userId,
            comments: [],
            ratings: [],
        });
        const createdBlog = yield Blog_1.default.create(newBlog);
        res.status(201).json(createdBlog);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.createBlog = createBlog;
//# sourceMappingURL=blog.js.map