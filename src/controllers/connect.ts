// controllers/connectController.ts
import { Request, Response } from 'express';
import ConnectModel, { IConnect } from '../models/Connect';
import { CustomError } from '../utils/customeError';
import { errorHandlerMiddleware } from '../middlewares/errorHandler';
import cloudinary from 'cloudinary';
// import upload from '../middlewares/muller';

// Configuration for Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Create a new Connect entry
export const createConnect = async (req: Request, res: Response) => {
  try {
    const { name, interest } = req.body;

    if (!req.file) {
      throw new CustomError('File is required', 400);
    }
    const cvUpload = req.file.path; // Assuming you're using multer for file upload

    // Upload CV to Cloudinary
    const cloudinaryUploadResponse = await cloudinary.v2.uploader.upload(cvUpload);

    const newConnect: IConnect = new ConnectModel({
      name,
      interest,
      CVupload: cloudinaryUploadResponse.secure_url
    });

    const createdConnect = await ConnectModel.create(newConnect);
    res.status(201).json(createdConnect);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => { });
  }
};

// Get all Connect entries
export const getAllConnects = async (req: Request, res: Response) => {
  try {
    const connects = await ConnectModel.find();
    res.status(200).json(connects);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => { });
  }
};

// Get Connect entry by ID
export const getConnectById = async (req: Request, res: Response) => {
  try {
    const connectId = req.params.connectId;

    if (!connectId) {
      throw new CustomError('Connect ID is required', 400);
    }

    const connect = await ConnectModel.findById(connectId);

    if (!connect) {
      throw new CustomError('Connect not found', 404);
    }

    res.status(200).json(connect);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => { });
  }
};

// Update Connect entry by ID
export const updateConnectById = async (req: Request, res: Response) => {
  try {
    const connectId = req.params.connectId;
    const { name, interest } = req.body;

    const updatedConnect = await ConnectModel.findByIdAndUpdate(
      connectId,
      { name, interest },
      { new: true }
    );

    if (!updatedConnect) {
      throw new CustomError('Connect not found', 404);
    }

    res.status(200).json(updatedConnect);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => { });
  }
};

// Delete Connect entry by ID
export const deleteConnectById = async (req: Request, res: Response) => {
  try {
    const connectId = req.params.connectId;

    if (!connectId) {
      throw new CustomError('Connect ID is required', 400);
    }

    const deletedConnect = await ConnectModel.findByIdAndDelete(connectId);

    if (!deletedConnect) {
      throw new CustomError('Connect not found', 404);
    }

    res.status(200).json({ success: true, message: 'Connect deleted successfully' });
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => { });
  }
};
