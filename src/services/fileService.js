import axios from 'axios';

export const deleteFileById = async (fileId) => {
    return await axios
        .delete(`http://localhost:1337/upload/files/${fileId}`);
}
