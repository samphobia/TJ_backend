// controllers/consultationController.ts
import { Request, Response } from 'express';
import ConsultationModel, { IConsultation } from '../models/Consult';
import { CustomError } from '../utils/customeError';
import { errorHandlerMiddleware } from '../middlewares/errorHandler';
import { validateEmail } from '../middlewares/validator';

// Create a new consultation
export const createConsultation = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    const newConsultation: IConsultation = new ConsultationModel ({
      name,
      email,
      message,
    });

    if (!validateEmail(email)) {
      throw new CustomError('Enter a valid email', 404);
    }

    const createdConsultation = await ConsultationModel.create(newConsultation);
    res.status(201).json(createdConsultation);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};

// Get all consultations
export const getAllConsultations = async (req: Request, res: Response) => {
  try {
    const consultations = await ConsultationModel.find();
    res.status(200).json(consultations);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};

// Get consultation by ID
export const getConsultationById = async (req: Request, res: Response) => {
  try {
    const consultationId = req.params.consultationId;

    if (!consultationId) {
      throw new CustomError('Consultation ID is required', 400);
    }

    const consultation = await ConsultationModel.findById(consultationId);

    if (!consultation) {
      throw new CustomError('Consultation not found', 404);
    }

    res.status(200).json(consultation);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};

// Update consultation by ID
export const updateConsultationById = async (req: Request, res: Response) => {
  try {
    const consultationId = req.params.consultationId;

    if (!consultationId) {
      throw new CustomError('Consultation ID is required', 400);
    }

    const { name, email, question } = req.body;

    const updatedConsultation = await ConsultationModel.findByIdAndUpdate(
      consultationId,
      { name, email, question },
      { new: true }
    );

    if (!updatedConsultation) {
      throw new CustomError('Consultation not found', 404);
    }

    res.status(200).json(updatedConsultation);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};

// Delete consultation by ID
export const deleteConsultationById = async (req: Request, res: Response) => {
  try {
    const consultationId = req.params.consultationId;

    if (!consultationId) {
      throw new CustomError('Consultation ID is required', 400);
    }

    const deletedConsultation = await ConsultationModel.findByIdAndDelete(consultationId);

    if (!deletedConsultation) {
      throw new CustomError('Consultation not found', 404);
    }

    res.status(200).json({ success: true, message: 'Consultation deleted successfully' });
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};
