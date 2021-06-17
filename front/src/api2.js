import axios from 'axios';
import history from './history';

const PREFIX = `http://localhost:8080`;

axios.interceptors.request.use(config => {
  config.headers['authorization'] = `Bearer ${localStorage.getItem('token')}`;
  return config;
}, error => {
  Promise.reject(error)
})
axios.interceptors.response.use(res => {
  if (res.data.code != 0) {
    return Promise.reject(res);
  }
  return res;
}, error => {
  if (error.response.status == 401) {
    return history.push('/');
  }
  return Promise.reject()
})
export function signin (data) {
  return axios({
    url:`${PREFIX}/signin`,
    method: 'post',
    data
  }).then(res => {
    let result = res.data;
    let token = result.data.token;
    localStorage.setItem('token', token);
    return result;
  }).catch(error => {
    // 好奇怪 明明是它返回的数据，为什么会出现在error上
    // wtf?
    // 因为在/signin的时候，await的结果为null，如果还有promise的话，它会放到error上
    // {config:{},data:{code:1,error:'xx'},...}
    return error.data; // {code:1,error:xxx}
  })
}
export function getUser () {
  return axios({
    url:`${PREFIX}/user`,
    method: 'get',
  }).then(res => {
    return res.data;
  })
}