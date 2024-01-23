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
exports.getBlogById = exports.getAllBlogs = exports.addRating = exports.addComment = exports.createBlog = void 0;
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
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { blogId, text } = req.body;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId;
        if (!userId) {
            throw new customeError_1.CustomError('Unauthorized - Missing user ID', 404);
        }
        const updatedBlog = yield Blog_1.default.findByIdAndUpdate(blogId, { $push: { comments: { text, user: userId } } }, { new: true });
        res.json(updatedBlog);
    }
    catch (error) {
        console.error(error);
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.addComment = addComment;
const addRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { blogId, stars } = req.body;
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId; // Assuming you have user information in req.user
        if (!userId) {
            throw new customeError_1.CustomError('Unauthorized - Missing user ID', 404);
        }
        const blog = yield Blog_1.default.findById(blogId);
        if (!blog) {
            throw new customeError_1.CustomError('Blog not found', 404);
        }
        // Check if the user has already rated this blog
        const existingRating = blog.ratings.find((rating) => rating.user.toString() === userId);
        if (existingRating) {
            throw new customeError_1.CustomError('User has already rated this blog', 400);
        }
        // Add the new rating
        blog.ratings.push({ user: userId, stars });
        yield blog.save();
        // Calculate average rating
        const averageRating = calculateAverageRating(blog.ratings);
        res.status(200).json({ success: true, message: 'Rating added successfully', averageRating });
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.addRating = addRating;
// Function to calculate average rating
const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) {
        return 0;
    }
    const totalStars = ratings.reduce((sum, rating) => sum + rating.stars, 0);
    const averageRating = totalStars / ratings.length;
    return averageRating;
};
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield Blog_1.default.find();
        res.status(200).json(blogs);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.getAllBlogs = getAllBlogs;
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.blogId;
        if (!blogId) {
            throw new customeError_1.CustomError('Blog ID is required', 400);
        }
        const blog = yield Blog_1.default.findById(blogId);
        if (!blog) {
            throw new customeError_1.CustomError('Blog not found', 404);
        }
        res.status(200).json(blog);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.getBlogById = getBlogById;
//# sourceMappingURL=blog.js.map