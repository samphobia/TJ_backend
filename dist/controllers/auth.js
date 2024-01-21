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
exports.logout = exports.getLoggedUser = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const customeError_1 = require("../utils/customeError");
const errorHandler_1 = require("../middlewares/errorHandler");
const validator_1 = require("../middlewares/validator");
const auth_1 = require("../middlewares/auth");
const saltRounds = 10;
const jwtSecret = 'your-secret-key'; // Replace with your secret key
// User registration
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        if (!(0, validator_1.validateEmail)(email)) {
            throw new customeError_1.CustomError('Enter a valid email', 404);
        }
        if (!(0, validator_1.validatePassword)(password)) {
            throw new customeError_1.CustomError('password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character', 404);
        }
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            throw new customeError_1.CustomError('User with this email already exist', 409);
        }
        // Ensure types are correctly inferred
        const newUser = new User_1.default({
            name,
            email,
            password,
            role,
        });
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(newUser.password, saltRounds);
        newUser.password = hashedPassword;
        // Create user in the database
        const createdUser = yield User_1.default.create(newUser);
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: createdUser._id, role: createdUser.role }, jwtSecret, {
            expiresIn: '1h', // Token expiration time
        });
        res.status(201).json({ token, user: createdUser });
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!(0, validator_1.validateEmail)(email)) {
            throw new customeError_1.CustomError('Enter a valid email', 404);
        }
        // Find user by email
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            throw new customeError_1.CustomError('No User found', 404);
        }
        // Check if the provided password matches the stored hashed password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new customeError_1.CustomError('you entered wrong password', 401);
        }
        const userId = user._id;
        const userRole = user.role;
        // Generate JWT token
        const token = (0, auth_1.generateJWTToken)(userId, userRole);
        res.status(200).json({ token, user });
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.loginUser = loginUser;
const getLoggedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.headers['user-id'];
        const userRole = req.headers['user-role'];
        // Validate that userId and userRole are present
        if (!userId || !userRole) {
            throw new customeError_1.CustomError('Unauthorized: User ID or Role not provided in headers', 401);
        }
        // Assuming you have a middleware that verifies user roles, you can add additional checks here
        // Fetch the user from the database based on userId
        const user = yield User_1.default.findById(userId);
        if (!user) {
            throw new customeError_1.CustomError('No User found', 404);
        }
        res.status(200).json(user);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerMiddleware)(error, req, res, () => { });
    }
});
exports.getLoggedUser = getLoggedUser;
const logout = (req, res) => {
    var _a;
    try {
        const userToken = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (userToken) {
            (0, auth_1.invalidateToken)(userToken);
        }
        res.cookie("token", "none", {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
        });
        res.status(200).json({ message: 'Logout successful' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.logout = logout;
//# sourceMappingURL=auth.js.map