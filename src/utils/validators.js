export const isEmailValid = (email) => {
  const mailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return mailCheck.test(email);
};

export const isPasswordStrong = (password) => {
  return password.length >= 8;
};

export const isFileSizeValid = (file) => {
  const maxSize = 3 * 1024 * 1024;
  return file.size <= maxSize;
};
