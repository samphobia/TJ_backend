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
exports.deleteConsultationById = exports.updateConsultationById = exports.getConsultationById = exports.getAllConsultations = exports.createConsultation = void 0;
const Consult_1 = __importDefault(require("../models/Consult"));
const customeError_1 = require("../utils/customeError");
const errorHandler_1 = require("../middlewares/errorHandler");
const validator_1 = require("../middlewares/validator");
// Create a new consultation
const createConsultation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, message } = req.body;
        const newConsultation = new Consult_1.default({
            name,
            email,
            message,
        });
        if (!(0, validator_1.validateEmail)(email)) {
            throw new customeError_1.CustomError('Enter a valid email', 404);
        }
        const createdConsultation = yield Consult_1.default.create(newConsultation);
        res.status(201).json(createdConsultation);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.createConsultation = createConsultation;
// Get all consultations
const getAllConsultations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const consultations = yield Consult_1.default.find();
        res.status(200).json(consultations);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.getAllConsultations = getAllConsultations;
// Get consultation by ID
const getConsultationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const consultationId = req.params.consultationId;
        if (!consultationId) {
            throw new customeError_1.CustomError('Consultation ID is required', 400);
        }
        const consultation = yield Consult_1.default.findById(consultationId);
        if (!consultation) {
            throw new customeError_1.CustomError('Consultation not found', 404);
        }
        res.status(200).json(consultation);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.getConsultationById = getConsultationById;
// Update consultation by ID
const updateConsultationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const consultationId = req.params.consultationId;
        if (!consultationId) {
            throw new customeError_1.CustomError('Consultation ID is required', 400);
        }
        const { name, email, question } = req.body;
        const updatedConsultation = yield Consult_1.default.findByIdAndUpdate(consultationId, { name, email, question }, { new: true });
        if (!updatedConsultation) {
            throw new customeError_1.CustomError('Consultation not found', 404);
        }
        res.status(200).json(updatedConsultation);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.updateConsultationById = updateConsultationById;
// Delete consultation by ID
const deleteConsultationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const consultationId = req.params.consultationId;
        if (!consultationId) {
            throw new customeError_1.CustomError('Consultation ID is required', 400);
        }
        const deletedConsultation = yield Consult_1.default.findByIdAndDelete(consultationId);
        if (!deletedConsultation) {
            throw new customeError_1.CustomError('Consultation not found', 404);
        }
        res.status(200).json({ success: true, message: 'Consultation deleted successfully' });
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.deleteConsultationById = deleteConsultationById;
//# sourceMappingURL=consult.js.map