export const getDateFromISOString = (date: string) => {
  return date.split("T")[0];
};
