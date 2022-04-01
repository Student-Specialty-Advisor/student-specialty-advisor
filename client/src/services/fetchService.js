import AuthService from "./AuthService";

const doGET = async (endpoint) => {
  var user = AuthService.getCurrentUser();
  const response = await fetch(process.env.REACT_APP_API_URL + endpoint, {
    method: "GET",
    headers: {
      "x-access-token": user.accessToken,
    },
  });
  const json = await response.json();
  return json;
};

const doPOST = async (endpoint, data) => {
  var user = AuthService.getCurrentUser();
  const response = await fetch(process.env.REACT_APP_API_URL + endpoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "x-access-token": user.accessToken,
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
};

const doPUT = async (endpoint, data) => {
  var user = AuthService.getCurrentUser();
  const response = await fetch(process.env.REACT_APP_API_URL + endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "x-access-token": user.accessToken,
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
};

var fetchService = {
  doGET: doGET,
  doPOST: doPOST,
  doPUT: doPUT,
};

export default fetchService;
