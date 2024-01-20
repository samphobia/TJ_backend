"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequiredFields = exports.validateLength = exports.validatePassword = exports.validateEmail = exports.validatePhoneNumber = void 0;
const validatePhoneNumber = (phoneNumber) => {
    // Define a regular expression pattern for a typical phone number
    // This pattern allows for variations in formatting, such as (555) 555-5555, 555-555-5555, or 5555555555
    const phonePattern = /^(\()?\d{3}(\))?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    // Remove any non-numeric characters from the phone number string
    const numericPhoneNumber = phoneNumber.replace(/\D/g, '');
    return phonePattern.test(numericPhoneNumber);
};
exports.validatePhoneNumber = validatePhoneNumber;
const validateEmail = (email) => {
    var _a;
    const emailString = String(email).toLowerCase();
    // eslint-disable-next-line no-useless-escape
    return ((_a = emailString.match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/)) === null || _a === void 0 ? void 0 : _a.length) > 0;
};
exports.validateEmail = validateEmail;
const validatePassword = (password) => {
    // Check the password length (at least 8 characters)
    if (password.length < 8) {
        return false;
    }
    // Check for password strength (e.g., containing at least one uppercase letter, one lowercase letter, one digit, and one special character)
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
    return passwordPattern.test(password);
};
exports.validatePassword = validatePassword;
const validateLength = (text, min, max) => {
    return text.length >= min && text.length <= max;
};
exports.validateLength = validateLength;
const validateRequiredFields = (req, res, requiredFields) => {
    const missingFields = [];
    for (const field of requiredFields) {
        if (!req.body[field]) {
            missingFields.push(field);
        }
    }
    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Missing required fields: ${missingFields.join(', ')}`,
        });
    }
    return null; // No missing fields
};
exports.validateRequiredFields = validateRequiredFields;
//# sourceMappingURL=validator.js.map