import axios from 'axios';
const token = JSON.parse(localStorage.getItem('jwt'));
const user = JSON.parse(localStorage.getItem('user'));


export const getWorks = async (params) => {
     const query = getQuery(params);

     return await axios
          .get(`http://localhost:1337/works?${query}&[users_permissions_user.id]=${user.id}`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
}

export const getWorkById = async (id) => {
       return await axios
          .get(`http://localhost:1337/works/${id}?[users_permissions_user.id]=${user.id}`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
}


export const getWorksCountWithDate = (ltDate , gtDate , params) => {
     const query = getQuery(params);

     return axios
          .get(`http://localhost:1337/works/count?[created_at_lt]=${ltDate}&[created_at_gt]=${gtDate}&[users_permissions_user.id]=${user.id}&${query}`, {
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
          .get(`http://localhost:1337/works/count?[users_permissions_user.id]=${user.id}&${query}`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
}


export const addWork = (params) => {
     params.users_permissions_user = user.id;
     return axios
          .post(`http://localhost:1337/works`, params, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
          .then(response => {
               return response;
          });
}

export const updateWork = async (params , updateId) => {
     return await axios
          .put(`http://localhost:1337/works/${updateId}`, params, {
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
          .delete(`http://localhost:1337/works/${id}`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
}


const getQuery = (obj) => {
     let str;
     str = [];
     for (const p in obj) {
 
       if (obj.hasOwnProperty(p) && obj[p]) {
 
 
         if (typeof obj[p] === 'object') {
 
           obj[p].forEach(item => {
             str.push(encodeURIComponent(p) + '=' + encodeURIComponent(item));
           });
 
         } else {
           str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
         }
 
       }
 
 
 
     }
     return str.join('&');
   }