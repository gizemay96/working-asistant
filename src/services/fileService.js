import axios from 'axios';

export const deleteFileById = async (fileId) => {
    return await axios
        .delete(`http://localhost:1337/upload/files/${fileId}`);
}

export const uploadFileToWorkItem = async (file) => {

    const formData = new FormData()

    formData.append('files', file)

    return await axios.post("http://localhost:1337/upload", formData)
}
