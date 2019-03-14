import paths from "../constants/paths.js";
//import axios from "axios";
//import decode from "jwt-decode";
const requests = paths.production; //localhost;
const localrequest = paths.localhost;
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

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}

async function postRequest(path, param) {
  try {
    const token = localStorage.getItem("access_token");
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
    let responseJson = await response.json();
    return responseJson;
  } catch (e) {
    console.error(`Error is : ${e}`);
  }
}

async function refreshTokenRequest(path, param) {
  try {
    const token = localStorage.getItem("refresh_token");
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
    let responseJson = await response.json();
    return responseJson;
  } catch (e) {
    console.error(`Error is : ${e}`);
  }
}

export { refreshTokenRequest };
export { asyncRequest };
export { loginRequest };
export { postRequest };
