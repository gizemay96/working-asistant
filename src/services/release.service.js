import axios from 'axios';
import { getQuery } from './common.service';


const token = JSON.parse(localStorage.getItem('jwt'));
const user = JSON.parse(localStorage.getItem('user'));
const url = "https://waa-app.herokuapp.com/releases"


export const getReleases = async (params) => {
     const query = getQuery(params);

     return await axios
          .get(`${url}?${query}&[users_permissions_user._id]=${user._id}`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
}

export const getReleaseById = async (id) => {
    return await axios
       .get(`${url}/${id}?[users_permissions_user._id]=${user._id}`, {
            headers: {
                 Authorization: `Bearer ${token}`,
            },
       })
}

export const createRelease = async (params) => {
     params.users_permissions_user = user._id;
     return await axios
        .post(`${url}`, params , {
             headers: {
                  Authorization: `Bearer ${token}`,
             },
        })
 }


export const updateRelease = async (params) => {
     return await axios
        .put(`${url}/${params.id}`, params , {
             headers: {
                  Authorization: `Bearer ${token}`,
             },
        })
 }

 export const deleteRelease = async (id) => {
     return await axios
        .delete(`${url}/${id}`, {
             headers: {
                  Authorization: `Bearer ${token}`,
             },
        })
 }