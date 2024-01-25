// controllers/donationController.ts
import { Request, Response } from 'express';
import DonationModel, { IDonation } from '../models/Donations';
import { CustomError } from '../utils/customeError';
import { errorHandlerMiddleware } from '../middlewares/errorHandler';

// Create a new donation
export const createDonation = async (req: Request, res: Response) => {
  try {
    const newDonation: IDonation = req.body;
    const createdDonation = await DonationModel.create(newDonation);
    res.status(201).json(createdDonation);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};

// Get all donations
export const getAllDonations = async (req: Request, res: Response) => {
  try {
    const donations = await DonationModel.find();
    res.status(200).json(donations);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};

// Get donation by ID
export const getDonationById = async (req: Request, res: Response) => {
  try {
    const donationId = req.params.donationId;

    if (!donationId) {
      throw new CustomError('Donation ID is required', 400);
    }

    const donation = await DonationModel.findById(donationId);

    if (!donation) {
      throw new CustomError('Donation not found', 404);
    }

    res.status(200).json(donation);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};

// Update donation by ID
export const updateDonationById = async (req: Request, res: Response) => {
  try {
    const donationId = req.params.donationId;

    if (!donationId) {
      throw new CustomError('Donation ID is required', 400);
    }

    const { image, title, text } = req.body;

    const updatedDonation = await DonationModel.findByIdAndUpdate(
      donationId,
      { image, title, text },
      { new: true }
    );

    if (!updatedDonation) {
      throw new CustomError('Donation not found', 404);
    }

    res.status(200).json(updatedDonation);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};

// Delete donation by ID
export const deleteDonationById = async (req: Request, res: Response) => {
  try {
    const donationId = req.params.donationId;

    if (!donationId) {
      throw new CustomError('Donation ID is required', 400);
    }

    const deletedDonation = await DonationModel.findByIdAndDelete(donationId);

    if (!deletedDonation) {
      throw new CustomError('Donation not found', 404);
    }

    res.status(200).json({ success: true, message: 'Donation deleted successfully' });
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};
