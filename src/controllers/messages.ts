// controllers/messageController.ts
import { Request, Response } from 'express';
import MessageModel, { IMessage } from '../models/Messages';
import { CustomError } from '../utils/customeError';
import { errorHandlerMiddleware } from '../middlewares/errorHandler';

// Create a new Message
export const createMessage = async (req: Request, res: Response) => {
  try {
    const { name, content } = req.body;

    const newMessage: IMessage = new MessageModel({
      name,
      content,
      timestamp: new Date() 
    });

    const createdMessage = await MessageModel.create(newMessage);
    res.status(201).json(createdMessage);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};

// Get all Messages
export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const messages = await MessageModel.find();
    res.status(200).json(messages);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};

// Get a Message by ID
export const getMessageById = async (req: Request, res: Response) => {
  try {
    const messageId = req.params.messageId;

    const message = await MessageModel.findById(messageId);

    if (!message) {
      throw new CustomError('Message not found', 404);
    }

    res.status(200).json(message);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};

// Update a Message by ID
export const updateMessageById = async (req: Request, res: Response) => {
  try {
    const messageId = req.params.messageId;
    const { name, content } = req.body;

    const updatedMessage = await MessageModel.findByIdAndUpdate(
      messageId,
      { name, content },
      { new: true }
    );

    if (!updatedMessage) {
      throw new CustomError('Message not found', 404);
    }

    res.status(200).json(updatedMessage);
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};

// Delete a Message by ID
export const deleteMessageById = async (req: Request, res: Response) => {
  try {
    const messageId = req.params.messageId;

    const deletedMessage = await MessageModel.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      throw new CustomError('Message not found', 404);
    }

    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    errorHandlerMiddleware(error, req, res, () => {});
  }
};
