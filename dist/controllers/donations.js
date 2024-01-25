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
exports.deleteDonationById = exports.updateDonationById = exports.getDonationById = exports.getAllDonations = exports.createDonation = void 0;
const Donations_1 = __importDefault(require("../models/Donations"));
const customeError_1 = require("../utils/customeError");
const errorHandler_1 = require("../middlewares/errorHandler");
// Create a new donation
const createDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDonation = req.body;
        const createdDonation = yield Donations_1.default.create(newDonation);
        res.status(201).json(createdDonation);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.createDonation = createDonation;
// Get all donations
const getAllDonations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donations = yield Donations_1.default.find();
        res.status(200).json(donations);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.getAllDonations = getAllDonations;
// Get donation by ID
const getDonationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donationId = req.params.donationId;
        if (!donationId) {
            throw new customeError_1.CustomError('Donation ID is required', 400);
        }
        const donation = yield Donations_1.default.findById(donationId);
        if (!donation) {
            throw new customeError_1.CustomError('Donation not found', 404);
        }
        res.status(200).json(donation);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.getDonationById = getDonationById;
// Update donation by ID
const updateDonationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donationId = req.params.donationId;
        if (!donationId) {
            throw new customeError_1.CustomError('Donation ID is required', 400);
        }
        const { image, title, text } = req.body;
        const updatedDonation = yield Donations_1.default.findByIdAndUpdate(donationId, { image, title, text }, { new: true });
        if (!updatedDonation) {
            throw new customeError_1.CustomError('Donation not found', 404);
        }
        res.status(200).json(updatedDonation);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.updateDonationById = updateDonationById;
// Delete donation by ID
const deleteDonationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donationId = req.params.donationId;
        if (!donationId) {
            throw new customeError_1.CustomError('Donation ID is required', 400);
        }
        const deletedDonation = yield Donations_1.default.findByIdAndDelete(donationId);
        if (!deletedDonation) {
            throw new customeError_1.CustomError('Donation not found', 404);
        }
        res.status(200).json({ success: true, message: 'Donation deleted successfully' });
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.deleteDonationById = deleteDonationById;
//# sourceMappingURL=donations.js.map