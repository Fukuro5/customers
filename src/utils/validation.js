export const validationEmail = (email) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  return regex.test(email);
};

export const validationPhone = (phone) => {
  const regexpE164Phone = /^\+(\d{1,3})(\d{9,12})$/;

  return regexpE164Phone.test(phone);
};
