import axios from 'axios';

const baseConfig = {
  // local port
  baseURL: window.location.origin.replace(window.location.port, 8081),
  // cloud port
  //baseURL: window.location.origin.replace(window.location.port, 80),
};
const GET = async (url, config = {}, sFunc, fFunc) => {
  try {
    const response = await axios.get(url, Object.assign(baseConfig, config));
    if (typeof sFunc === 'function') {
      sFunc(response);
    }
    return response;
  } catch (e) {
    if (typeof fFunc === 'function') {
      fFunc(e);
    }
    return e;
  }
};

/* 
* 20220620 : data 파라미터 추가 by JIN
*/
const POST = async (url, data, config, sFunc, fFunc) => {
  try {
    //console.log(baseConfig.baseURL);
    const response = await axios.post(
      url,
      data,
      Object.assign(baseConfig, config)
    );
    //const response = await axios.post(url, Object.assign(baseConfig, config));
    if (typeof sFunc === 'function') {
      sFunc(response);
    }
    return response;
  } catch (e) {
    if (typeof fFunc === 'function') {
      fFunc(e);
    }
    return e;
  }
};
const PUT = async (url, data, config, sFunc, fFunc) => {
  try {
    const response = await axios.put(
      url,
      data,
      Object.assign(baseConfig, config)
    );
    if (typeof sFunc === 'function') {
      sFunc(response);
    }
    return response;
  } catch (e) {
    if (typeof fFunc === 'function') {
      fFunc(e);
    }
    return e;
  }
};

const DELETE = async (url, config, sFunc, fFunc) => {
  try {
    const response = await axios.delete(url, Object.assign(baseConfig, config));
    if (typeof sFunc === 'function') {
      sFunc(response);
    }
    return response;
  } catch (e) {
    if (typeof fFunc === 'function') {
      fFunc(e);
    }
    return e;
  }
};

const api = {
  get: GET,
  post: POST,
  put: PUT,
  delete: DELETE,
};
export default api;
