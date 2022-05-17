const convertMonthNum = (date: number) => {
  const monthShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dev"];

  /* const monthLong = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]; */

  return monthShort[date];
};

const utils = {
  convertMonthNum,
};

export default utils;
