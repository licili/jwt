import axios from 'axios';
import history from './history';
axios.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
  }
  return config;
}, err => {
  return Promise.reject(err)
})
axios.interceptors.response.use(res => {
  if (res.data.code != 0) {
    return Promise.reject(res);
  }
  return res;
}, error => {
  if (error.response.status == 401) {
    history.push('/');
  }
  return Promise.reject(error.response.data)
})

export function signin (data) {
  return axios({
    url: 'http://localhost:8080/signin',
    method: 'post',
    data
  }).then(response => {
    let result = response.data;
    let token = result.data.token;
    localStorage.setItem('token', token);
    return data;
  });
}

export function getUser () {
   return axios({
    url: 'http://localhost:8080/user',
     method: 'get',
    //  headers: {
    //   "Authorization":`Bearer ${localStorage.getItem('token')}`
    // }
   }).then(response => {
    return response.data
   }, err => {
     // 拦截器处理
    //  if (err.response.status == 401) {
    //    return history.push('/');
    //  }
    //  return Promise.reject();
  });
}