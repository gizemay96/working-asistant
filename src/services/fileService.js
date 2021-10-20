import axios from 'axios';
import { getQuery } from './common.service';


const token = JSON.parse(localStorage.getItem('jwt'));
const url = "https://waa-app.herokuapp.com/upload"

export const deleteFileById = async (fileId) => {
    return await axios
        .delete(`${url}/files/${fileId}`, {
            headers: {
                 Authorization: `Bearer ${token}`,
            },
       });
}

export const uploadFileToWorkItem = async (file) => {

    const formData = new FormData()

    formData.append('files', file)

    return axios.post(url, formData, {
        headers: {
             Authorization: `Bearer ${token}`,
        },
   })
        .then(res => { return res; })
        .catch(error => { return error.response });
}
