"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
    toJSON() {
        return {
            success: false,
            status: this.status,
            message: this.message,
        };
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=customeError.js.map