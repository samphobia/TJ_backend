// controllers/counsellingController.ts
import { Request, Response } from 'express';
import CounsellingModel, { ICounselling } from '../models/Counselling';
import { CustomError } from '../utils/customeError';
import { errorHandlerMiddleware } from '../middlewares/errorHandler';
import { validateEmail } from '../middlewares/validator';

// Create a new counselling entry
export const createCounselling = async (req: Request, res: Response) => {
  try {
    const { name, email, question } = req.body;

    const newCounselling: ICounselling = new CounsellingModel ({
      name,
      email,
      question,
    });

    if (!validateEmail(email)) {
      throw new CustomError('Enter a valid email', 404);
    }

    const createdCounselling = await CounsellingModel.create(newCounselling);
    res.status(201).json(createdCounselling);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};

// Get all counselling entries
export const getAllCounsellings = async (req: Request, res: Response) => {
  try {
    const counsellings = await CounsellingModel.find();
    res.status(200).json(counsellings);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};

// Get counselling entry by ID
export const getCounsellingById = async (req: Request, res: Response) => {
  try {
    const counsellingId = req.params.counsellingId;

    if (!counsellingId) {
      throw new CustomError('Counselling ID is required', 400);
    }

    const counselling = await CounsellingModel.findById(counsellingId);

    if (!counselling) {
      throw new CustomError('Counselling entry not found', 404);
    }

    res.status(200).json(counselling);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};

// Update counselling entry by ID
export const updateCounsellingById = async (req: Request, res: Response) => {
  try {
    const counsellingId = req.params.counsellingId;

    if (!counsellingId) {
      throw new CustomError('Counselling ID is required', 400);
    }

    const { name, email, question } = req.body;

    const updatedCounselling = await CounsellingModel.findByIdAndUpdate(
      counsellingId,
      { name, email, question },
      { new: true }
    );

    if (!updatedCounselling) {
      throw new CustomError('Counselling entry not found', 404);
    }

    res.status(200).json(updatedCounselling);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};

// Delete counselling entry by ID
export const deleteCounsellingById = async (req: Request, res: Response) => {
  try {
    const counsellingId = req.params.counsellingId;

    if (!counsellingId) {
      throw new CustomError('Counselling ID is required', 400);
    }

    const deletedCounselling = await CounsellingModel.findByIdAndDelete(counsellingId);

    if (!deletedCounselling) {
      throw new CustomError('Counselling entry not found', 404);
    }

    res.status(200).json({ success: true, message: 'Counselling entry deleted successfully' });
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};
