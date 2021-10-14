import axios from 'axios';
const token = JSON.parse(localStorage.getItem('jwt'));

export const deleteFileById = async (fileId) => {
    return await axios
        .delete(`http://localhost:1337/upload/files/${fileId}`, {
            headers: {
                 Authorization: `Bearer ${token}`,
            },
       });
}

export const uploadFileToWorkItem = async (file) => {

    const formData = new FormData()

    formData.append('files', file)

    return axios.post("http://localhost:1337/upload", formData, {
        headers: {
             Authorization: `Bearer ${token}`,
        },
   })
        .then(res => { return res; })
        .catch(error => { return error.response });
}
