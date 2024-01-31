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
exports.deleteCounsellingById = exports.updateCounsellingById = exports.getCounsellingById = exports.getAllCounsellings = exports.createCounselling = void 0;
const Counselling_1 = __importDefault(require("../models/Counselling"));
const customeError_1 = require("../utils/customeError");
const errorHandler_1 = require("../middlewares/errorHandler");
const validator_1 = require("../middlewares/validator");
// Create a new counselling entry
const createCounselling = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, question } = req.body;
        const newCounselling = new Counselling_1.default({
            name,
            email,
            question,
        });
        if (!(0, validator_1.validateEmail)(email)) {
            throw new customeError_1.CustomError('Enter a valid email', 404);
        }
        const createdCounselling = yield Counselling_1.default.create(newCounselling);
        res.status(201).json(createdCounselling);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.createCounselling = createCounselling;
// Get all counselling entries
const getAllCounsellings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const counsellings = yield Counselling_1.default.find();
        res.status(200).json(counsellings);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.getAllCounsellings = getAllCounsellings;
// Get counselling entry by ID
const getCounsellingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const counsellingId = req.params.counsellingId;
        if (!counsellingId) {
            throw new customeError_1.CustomError('Counselling ID is required', 400);
        }
        const counselling = yield Counselling_1.default.findById(counsellingId);
        if (!counselling) {
            throw new customeError_1.CustomError('Counselling entry not found', 404);
        }
        res.status(200).json(counselling);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.getCounsellingById = getCounsellingById;
// Update counselling entry by ID
const updateCounsellingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const counsellingId = req.params.counsellingId;
        if (!counsellingId) {
            throw new customeError_1.CustomError('Counselling ID is required', 400);
        }
        const { name, email, question } = req.body;
        const updatedCounselling = yield Counselling_1.default.findByIdAndUpdate(counsellingId, { name, email, question }, { new: true });
        if (!updatedCounselling) {
            throw new customeError_1.CustomError('Counselling entry not found', 404);
        }
        res.status(200).json(updatedCounselling);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.updateCounsellingById = updateCounsellingById;
// Delete counselling entry by ID
const deleteCounsellingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const counsellingId = req.params.counsellingId;
        if (!counsellingId) {
            throw new customeError_1.CustomError('Counselling ID is required', 400);
        }
        const deletedCounselling = yield Counselling_1.default.findByIdAndDelete(counsellingId);
        if (!deletedCounselling) {
            throw new customeError_1.CustomError('Counselling entry not found', 404);
        }
        res.status(200).json({ success: true, message: 'Counselling entry deleted successfully' });
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.deleteCounsellingById = deleteCounsellingById;
//# sourceMappingURL=counselling.js.map