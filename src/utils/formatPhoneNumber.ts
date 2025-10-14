export const formatPhoneNumber = (value: string): string => {
  const onlyNumbers = value.replace(/[^0-9]/g, "");
  if (!onlyNumbers) {
    return "";
  }

  if (onlyNumbers.length < 4) {
    return onlyNumbers;
  } else if (onlyNumbers.length < 8) {
    return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
  } else {
    return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 7)}-${onlyNumbers.slice(7, 11)}`;
  }
};
