export const localDateTimeToUtcIso = (localDateTime) => {
  const localDate = new Date(localDateTime);
  const utcDate = new Date(
    localDate.getTime() - localDate.getTimezoneOffset() * 60000,
  );
  return utcDate.toISOString();
};
