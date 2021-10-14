import axios from 'axios';
import { getQuery } from './common.service';


const token = JSON.parse(localStorage.getItem('jwt'));
const user = JSON.parse(localStorage.getItem('user'));


export const getReleases = async (params) => {
     const query = getQuery(params);

     return await axios
          .get(`http://localhost:1337/releases?${query}&[users_permissions_user.id]=${user.id}`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
}

export const getReleaseById = async (id) => {
    return await axios
       .get(`http://localhost:1337/releases/${id}?[users_permissions_user.id]=${user.id}`, {
            headers: {
                 Authorization: `Bearer ${token}`,
            },
       })
}

export const updateRelease = async (params) => {
     return await axios
        .put(`http://localhost:1337/releases/${params.id}`, params , {
             headers: {
                  Authorization: `Bearer ${token}`,
             },
        })
 }

 export const deleteRelease = async (id) => {
     return await axios
        .delete(`http://localhost:1337/releases/${id}`, {
             headers: {
                  Authorization: `Bearer ${token}`,
             },
        })
 }