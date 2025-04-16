export const responseError = (error: any): string => {
  if (error?.response?.data) {
    const { data } = error.response;
    return typeof data === 'object' && Array.isArray(data.message)
      ? (data.message[0] ?? data.message)
      : 'General';
  }
  return error?.message || 'General';
};
