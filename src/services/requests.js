import paths from "../constants/paths.js";
const requests = paths.localhost;

async function asyncRequest(path) {
  return fetch(`${requests}${path}`)
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })

    .catch(error => {
      console.log(error);
      this.setState({ isLoading: false });
    });
}

async function postRequest(path, param) {
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
    console.log(responseJson);
    return responseJson;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}

export { asyncRequest };
export { postRequest };