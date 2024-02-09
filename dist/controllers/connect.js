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
exports.deleteConnectById = exports.updateConnectById = exports.getConnectById = exports.getAllConnects = exports.createConnect = void 0;
const Connect_1 = __importDefault(require("../models/Connect"));
const customeError_1 = require("../utils/customeError");
const errorHandler_1 = require("../middlewares/errorHandler");
const cloudinary_1 = __importDefault(require("cloudinary"));
// import upload from '../middlewares/muller';
// Configuration for Cloudinary
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Create a new Connect entry
const createConnect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, interest } = req.body;
        if (!req.file) {
            throw new customeError_1.CustomError('File is required', 400);
        }
        const cvUpload = req.file.path; // Assuming you're using multer for file upload
        // Upload CV to Cloudinary
        const cloudinaryUploadResponse = yield cloudinary_1.default.v2.uploader.upload(cvUpload);
        const newConnect = new Connect_1.default({
            name,
            interest,
            CVupload: cloudinaryUploadResponse.secure_url
        });
        const createdConnect = yield Connect_1.default.create(newConnect);
        res.status(201).json(createdConnect);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.createConnect = createConnect;
// Get all Connect entries
const getAllConnects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connects = yield Connect_1.default.find();
        res.status(200).json(connects);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.getAllConnects = getAllConnects;
// Get Connect entry by ID
const getConnectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connectId = req.params.connectId;
        if (!connectId) {
            throw new customeError_1.CustomError('Connect ID is required', 400);
        }
        const connect = yield Connect_1.default.findById(connectId);
        if (!connect) {
            throw new customeError_1.CustomError('Connect not found', 404);
        }
        res.status(200).json(connect);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.getConnectById = getConnectById;
// Update Connect entry by ID
const updateConnectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connectId = req.params.connectId;
        const { name, interest } = req.body;
        const updatedConnect = yield Connect_1.default.findByIdAndUpdate(connectId, { name, interest }, { new: true });
        if (!updatedConnect) {
            throw new customeError_1.CustomError('Connect not found', 404);
        }
        res.status(200).json(updatedConnect);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.updateConnectById = updateConnectById;
// Delete Connect entry by ID
const deleteConnectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connectId = req.params.connectId;
        if (!connectId) {
            throw new customeError_1.CustomError('Connect ID is required', 400);
        }
        const deletedConnect = yield Connect_1.default.findByIdAndDelete(connectId);
        if (!deletedConnect) {
            throw new customeError_1.CustomError('Connect not found', 404);
        }
        res.status(200).json({ success: true, message: 'Connect deleted successfully' });
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.deleteConnectById = deleteConnectById;
//# sourceMappingURL=connect.js.map