export const validatePhoneNumber = (phoneNumber: string): boolean => {
  // Define a regular expression pattern for a typical phone number
  // This pattern allows for variations in formatting, such as (555) 555-5555, 555-555-5555, or 5555555555
  const phonePattern = /^(\()?\d{3}(\))?[-.\s]?\d{3}[-.\s]?\d{4}$/;

  // Remove any non-numeric characters from the phone number string
  const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

  return phonePattern.test(numericPhoneNumber);
};
export const validateEmail = (email: string | unknown): boolean => {
  const emailString = String(email).toLowerCase();
  // eslint-disable-next-line no-useless-escape
  return emailString.match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/)?.length > 0;
};

export const validatePassword = (password: string): boolean => {
  // Check the password length (at least 8 characters)
  if (password.length < 8) {
    return false;
  }

  // Check for password strength (e.g., containing at least one uppercase letter, one lowercase letter, one digit, and one special character)
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;

  return passwordPattern.test(password);
};

export const validateLength = (text: string, min: number, max: number): boolean => {
  return text.length >= min && text.length <= max;
};

export const validateRequiredFields = (
  req: { body: Record<string, unknown> },
  res: { status: (arg0: number) => { json: (arg0: { message: string }) => void } },
  requiredFields: string[]
): null | void => {
  const missingFields: string[] = [];

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
