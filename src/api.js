import axios from 'axios';

const baseConfig = {
  baseURL: window.location.origin.replace(window.location.port, 8080),
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

const POST = async (url, config, sFunc, fFunc) => {
  try {
    const response = await axios.post(url, config);
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
const PUT = async (url, config, sFunc, fFunc) => {
  try {
    const response = await axios.put(url, config);
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

//수정(patch) 추가
const PATCH = async (url, config, sFunc, fFunc) => {
  try {
    const response = await axios.patch(url, config);
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
  get: GET, //조회
  post: POST, //생성
  put: PUT, //전체수정
  patch: PATCH, //일부수정
  delete: DELETE, //삭제
};
export default api;
