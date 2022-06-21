import axios from 'axios';

const baseConfig = {
  // local port
  //baseURL: window.location.origin.replace(window.location.port, 8081),
  // cloud port
  baseURL: 'http://ev.hrd-edu.cloudzcp.com',
};
const GET = async (url, config = {}, sFunc, fFunc) => {
  try {
    console.log(
      'async get ========= url : ' + url + '/baseConfig' + baseConfig.baseURL
    );
    const response = await axios.get(url, Object.assign(baseConfig, config));
    console.log('async get ========= response 1 : ' + response);
    console.log('async get ========= response.code 2 : ' + response.code);

    if (typeof sFunc === 'function') {
      sFunc(response);
    }
    return response;
  } catch (e) {
    if (typeof fFunc === 'function') {
      fFunc(e);
    }
    console.log('async get ========= catch 2 : ' + e);
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
