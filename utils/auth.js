export const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
export const getToken = () => {
return localStorage.getItem('token');
};

export const removeToken = () => {
localStorage.removeItem('token');
};

export const SECRET_KEY = 'kjsdfj9w3rjwerq2#%5q2349_'; // Store this in an environment variable