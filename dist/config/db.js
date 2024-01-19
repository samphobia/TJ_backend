"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectToMongoDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        const connection = await mongoose_1.default.connect(mongoURI);
        console.log('Connected to MongoDB');
        return connection.connection;
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};
exports.default = connectToMongoDB;
//# sourceMappingURL=db.js.map