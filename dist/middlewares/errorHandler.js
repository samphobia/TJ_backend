"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const customeError_1 = require("../utils/customeError");
const errorHandlerMiddleware = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    if (err instanceof customeError_1.CustomError) {
        console.error(`Custom Error: ${err.message}, Status: ${err.status}`);
        // Respond to the client with the error details
        res.status(err.status).json({
            success: false,
            status: err.status,
            message: err.message,
        });
    }
    else {
        // Handle other types of errors
        console.error(`Unexpected Error: ${err.message}`);
        // Respond to the client with a generic error message
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Internal Server Error',
        });
    }
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
//# sourceMappingURL=errorHandler.js.map