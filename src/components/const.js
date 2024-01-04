export const getNumberOfDays = (start, end) => {
  const date1 = new Date(start);
  const date2 = new Date(end);
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();
  return Math.round(diffInTime / oneDay) + 1;
};
export const getNumberOfNights = (start, end) => {
  const date1 = new Date(start);
  const date2 = new Date(end);
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();
  return Math.round(diffInTime / oneDay);
};
export const validateMobile = (pass) => {
  return pass.match(/^[1-9]([0-9]*){8,10}$/);
};
export const validatePassword = (pass) => {
  return pass.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/);
};
export const onlyNumber = (number) => {
  let num_reg_exp = /^[0-9]+$/;
  return number.match(num_reg_exp);
};

