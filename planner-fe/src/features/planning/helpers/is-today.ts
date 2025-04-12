export const isDateToday = (dateString: string) => {
  return new Date(dateString).toDateString() === new Date().toDateString();
};
