export const getHeadres = () => {
  const token = localStorage.getItem('token'); // or whatever your key is
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(true && { Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0YXJlazNzaGVpa2hhbGFyZCIsImp0aSI6IjQ3NjU2MTJkLTBkZGMtNGZjZS04OTUzLTcyMjIyNTAwOGZlYSIsImVtYWlsIjoidGFyZWszLmRvZUBleGFtcGxlLmNvbSIsInVzZXJDb2RlIjoiQ3VzdG9tZXItNWI5MTA1ODc3ZGRmNDY1YjljMjJiZjZjNmZmOGJjOWMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzQ4MzM4NjM0LCJpc3MiOiJTZWN1cmVBcGkiLCJhdWQiOiJTZWN1cmVBcGlVc2VyIn0.mw9HJsmJ39l2hRYyk3JbWASDcsaYRZ39eHlPeSaHICc'}` }),
  };
};