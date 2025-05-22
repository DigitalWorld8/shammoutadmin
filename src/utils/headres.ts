export const getHeadres = () => {
  const token = localStorage.getItem('token'); // or whatever your key is
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};