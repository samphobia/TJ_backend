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
exports.deleteMessageById = exports.updateMessageById = exports.getMessageById = exports.getAllMessages = exports.createMessage = void 0;
const Messages_1 = __importDefault(require("../models/Messages"));
const customeError_1 = require("../utils/customeError");
const errorHandler_1 = require("../middlewares/errorHandler");
// Create a new Message
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, content } = req.body;
        const newMessage = new Messages_1.default({
            name,
            content,
            timestamp: new Date()
        });
        const createdMessage = yield Messages_1.default.create(newMessage);
        res.status(201).json(createdMessage);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.createMessage = createMessage;
// Get all Messages
const getAllMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield Messages_1.default.find();
        res.status(200).json(messages);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.getAllMessages = getAllMessages;
// Get a Message by ID
const getMessageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageId = req.params.messageId;
        const message = yield Messages_1.default.findById(messageId);
        if (!message) {
            throw new customeError_1.CustomError('Message not found', 404);
        }
        res.status(200).json(message);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.getMessageById = getMessageById;
// Update a Message by ID
const updateMessageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageId = req.params.messageId;
        const { name, content } = req.body;
        const updatedMessage = yield Messages_1.default.findByIdAndUpdate(messageId, { name, content }, { new: true });
        if (!updatedMessage) {
            throw new customeError_1.CustomError('Message not found', 404);
        }
        res.status(200).json(updatedMessage);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.updateMessageById = updateMessageById;
// Delete a Message by ID
const deleteMessageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageId = req.params.messageId;
        const deletedMessage = yield Messages_1.default.findByIdAndDelete(messageId);
        if (!deletedMessage) {
            throw new customeError_1.CustomError('Message not found', 404);
        }
        res.status(200).json({ success: true, message: 'Message deleted successfully' });
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.deleteMessageById = deleteMessageById;
//# sourceMappingURL=messages.js.map