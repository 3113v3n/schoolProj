import paths from "../constants/paths.js";
import jwtDecode from "jwt-decode";
//import decode from "jwt-decode";
const requests = paths.production; //localhost;
const localrequest = paths.localhost;
const token = localStorage.getItem("access_Token");
const refreshToken = localStorage.getItem("refresh_Token");

async function asyncRequest(path) {
  return fetch(`${localrequest}${path}`)
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })

    .catch(error => {
      console.log(error);
      this.setState({ isLoading: false });
    });
}

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
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
      // body: JSON.stringify(param)
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
async function isTokenExpired() {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
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
export const loadFromStorage = () => {
  try {
    const serializedState = localStorage.getItem("access_Token");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};
export const saveToStorage = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("access_Token", serializedState);
  } catch (e) {
    console.log(e);
  }
};
export { deleteRequest };
export { updateRequest };
export { refreshTokenRequest };
export { asyncRequest };
export { loginRequest };
export { postRequest };
export { isTokenExpired };
export { fetchRequest };
