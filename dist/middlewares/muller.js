"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// middleware/upload.ts
const multer_1 = __importDefault(require("multer"));
// Set up Multer storage configuration
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set the filename for uploaded files
    }
});
// Create Multer instance with storage configuration
const upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
//# sourceMappingURL=muller.js.map