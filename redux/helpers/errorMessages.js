export const getErrorMessages = validation => {
  if (validation && !validation.isValid) {
    return validation;
  }
  return {};
};
