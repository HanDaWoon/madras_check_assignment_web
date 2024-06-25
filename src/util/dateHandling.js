export const dateTimeFormatIso = (localDateTime) => {
  const localDate = new Date(localDateTime);
  return localDate.toISOString();
};

export const dateTimeStringToLocalDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleString().slice(0, -3);
};
