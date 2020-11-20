export const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const get = (path) => fetch(`${backendUrl}${path}`);

export const getJson = (path) =>
  get(path).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });

export const getText = (path) =>
  get(path).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.text();
  });
