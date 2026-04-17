export const getApiValidationErrors = err => {
  const {responseJson} = err;
  if (responseJson) {
    if (responseJson.errors) {
      return {
        isValid: false,
        ...responseJson.errors,
      };
    }

    if (responseJson.message) {
      return {
        isValid: false,
        message: responseJson.message,
      };
    }
  }
};
