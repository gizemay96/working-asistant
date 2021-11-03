import axios from 'axios';
import { getQuery } from './common.service';


const token = JSON.parse(localStorage.getItem('jwt'));
const user = JSON.parse(localStorage.getItem('user'));
const url = process.env.REACT_APP_PROD_ENV;


export const getReleases = async (params) => {
     const query = getQuery(params);

     return await axios
          .get(`${url}/releases?${query}&[users_permissions_user._id]=${user.id || user._id}`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
}

export const getReleaseById = async (id) => {
     return await axios
          .get(`${url}/releases/${id}?[users_permissions_user._id]=${user.id || user._id}`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
}

export const createRelease = async (params) => {
     params.users_permissions_user = user.id || user._id;
     return await axios
          .post(`${url}/releases`, params, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
}


export const updateRelease = async (params) => {
     return await axios
          .put(`${url}/releases/${params.id}`, params, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
}

export const deleteRelease = async (id) => {
     return await axios
          .delete(`${url}/releases/${id}`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
}