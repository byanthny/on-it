const convertMonthNum = (date: number) => {
  const monthShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dev"];

  /* const monthLong = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]; */

  return monthShort[date];
};

const daysTillDue = (date: string) =>
  Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

const utils = {
  convertMonthNum,
  daysTillDue,
};

export default utils;
