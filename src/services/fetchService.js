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

const doDelete = async (endpoint) => {
  var user = AuthService.getCurrentUser();
  const response = await fetch(process.env.REACT_APP_API_URL + endpoint, {
    method: "DELETE",
    headers: {
      "x-access-token": user.accessToken,
    },
  });
  const json = await response.json();
  return json;
};

const doDeleteWithBody = async (endpoint, data) => {
  var user = AuthService.getCurrentUser();
  const response = await fetch(process.env.REACT_APP_API_URL + endpoint, {
    method: "DELETE",
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
  doDelete: doDelete,
  doDeleteWithBody: doDeleteWithBody,
};

export default fetchService;
