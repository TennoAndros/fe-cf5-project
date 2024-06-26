export const isEmailValid = (email) => {
  const mailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return mailCheck.test(email);
};

export const isPasswordStrong = (password) => {
  return password.length >= 8;
};
