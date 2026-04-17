export const isUnauthorized = error => {
  return error && error.status === 401;
};

export const isAdminChangePassword = error => {
  return error === '40100';
};
