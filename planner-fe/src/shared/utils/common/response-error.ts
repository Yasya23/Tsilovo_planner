export const responseError = (error: any): string => {
  if (error?.response?.data) {
    const { data } = error.response;
    return typeof data === 'object' && Array.isArray(data.message)
      ? data.message[0] || 'An error occurred.'
      : data.message || 'An error occurred with the response data.';
  }
  return error?.message || 'An unexpected error occurred.';
};
