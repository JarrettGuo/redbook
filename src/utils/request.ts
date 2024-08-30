import axios, {AxiosResponse} from 'axios';
import Api from '../apis/Api';

// 创建一个 Axios 实例，并设置默认配置
const instance = axios.create({
  baseURL: 'http://10.0.2.2:3000', // 设置默认的 baseURL
  timeout: 10000, // 设置超时时间（可根据需要调整）
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  response => response,

  error => {
    const {response} = error;
    if (response) {
      const {status} = response;
      if (status >= 500) {
        // 服务器错误
        console.error('Server error:', response.data);
      } else if (status === 400) {
        console.error('Bad request:', response.data);
      } else if (status === 401) {
        console.error('Unauthorized:', response.data);
      } else {
        console.error('Error message:', error.message);
      }
    } else {
      // 网络异常
      console.error('Network error:', error.message);
    }
    return Promise.reject(error);
  },
);

export const request = (
  name: string,
  params: any,
): Promise<AxiosResponse<any, any>> => {
  const api = (Api as any)[name];
  const {url, method} = api;
  if (method === 'get') {
    return get(url, params);
  } else {
    return post(url, params);
  }
};

// GET 请求方法
export const get = (
  url: string,
  params: any,
): Promise<AxiosResponse<any, any>> => {
  return instance.get(url, {params});
};

// POST 请求方法
export const post = (
  url: string,
  params: any,
): Promise<AxiosResponse<any, any>> => {
  return instance.post(url, params);
};
