// ValidationUtils.ts
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ValidationResult = {
  isValid: boolean;
  error: string;
};

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return {
      isValid: false,
      error: "Email is required",
    };
  }
  
  if (!EMAIL_REGEX.test(email)) {
    return {
      isValid: false,
      error: "Please enter a valid email address",
    };
  }

  return {
    isValid: true,
    error: "",
  };
};