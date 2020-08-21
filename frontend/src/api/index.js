export const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const get = (path) => fetch(`${backendUrl}${path}`);
