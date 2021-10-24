import axios from 'axios';
import { getQuery } from './common.service';


const token = JSON.parse(localStorage.getItem('jwt'));
const user = JSON.parse(localStorage.getItem('user'));
const url = process.env.REACT_APP_PROD_ENV;


export const getWorks = async (params) => {
     const query = getQuery(params);

     return await axios
          .get(`${url}/works?${query}&[users_permissions_user._id]=${user.id}`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
}

export const getWorkById = async (id) => {
     return await axios
          .get(`${url}/works/${id}?[users_permissions_user._id]=${user.id}`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
}


export const getWorksCountWithDate = (ltDate, gtDate, params) => {
     const query = getQuery(params);

     return axios
          .get(`${url}/works/count?[createdAt_lt]=${ltDate}&[createdAt_gt]=${gtDate}&[users_permissions_user._id]=${user.id}&${query}`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
          .then(response => {
               return response;
          });
}

export const getWorksCount = async (params) => {
     const query = getQuery(params);

     return await axios
          .get(`${url}/works/count?[users_permissions_user._id]=${user.id}&${query}`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
}


export const createWork = (params) => {
     params.users_permissions_user = user.id;
     return axios
          .post(`${url}/works`, params, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
          .then(response => {
               return response;
          });
}

export const updateWork = async (params, updateId) => {
     return await axios
          .put(`${url}/works/${updateId}`, params, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
          .then(response => {
               return response;
          });
}

export const deleteWork = async (id) => {
     return await axios
          .delete(`${url}/works/${id}`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
}
