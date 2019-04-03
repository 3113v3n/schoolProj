import paths from "../constants/paths.js";
import jwtDecode from "jwt-decode";
//import decode from "jwt-decode";
const requests = paths.localhost; //production;

const token = localStorage.getItem("access_Token");
const refreshToken = localStorage.getItem("refresh_Token");

async function loginRequest(path, param) {
  try {
    let requestParams = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(param)
    };
    let response = await fetch(`${requests}${path}`, requestParams);
    return await response.json();
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}

async function updateRequest(path, param) {
  try {
    let requestParams = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(param)
    };
    let response = await fetch(`${requests}${path}`, requestParams);
    return await response.json();
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}

async function deleteRequest(path, param) {
  try {
    let requestParams = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(param)
    };
    let response = await fetch(`${requests}${path}`, requestParams);

    return await response.json();
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}

async function fetchRequest(path) {
  try {
    let requestParams = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    let response = await fetch(`${requests}${path}`, requestParams);

    return await response.json();
  } catch (error) {
    console.warn(`Error is : ${error}`);
  }
}
async function postRequest(path, param) {
  try {
    let requestParams = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(param)
    };
    let response = await fetch(`${requests}${path}`, requestParams);
    return await response.json();
  } catch (e) {
    console.error(`Error is : ${e}`);
  }
}
async function uploadFiles(path, param) {
  try {
    let requestParams = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: param
    };
    let response = await fetch(`${requests}${path}`, requestParams);
    return await response.json();
  } catch (e) {
    console.error(`Error is : ${e}`);
  }
}

async function isTokenExpired() {
  try {
    const decoded = jwtDecode(token);
    let date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    date.valueOf();
    return date.valueOf() < Date.now(); //expiry date should be greater for token to be valid
  } catch (err) {
    return false;
  }
}
async function refreshTokenRequest(path) {
  try {
    let requestParams = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`
      }
    };
    let response = await fetch(`${requests}${path}`, requestParams);
    return await response.json();
  } catch (e) {
    console.error(`Error is : ${e}`);
  }
}

export { deleteRequest };
export { updateRequest };
export { refreshTokenRequest };
export { loginRequest };
export { postRequest };
export { isTokenExpired };
export { uploadFiles };
export { fetchRequest };
