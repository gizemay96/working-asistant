import axios from 'axios';

export const login = (username, password) => {
    return axios
        .post('http://localhost:1337/auth/local', {
            identifier: username,
            password: password,
        })
        .then(response => {
            // Handle success.
            if (response.data.jwt) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('jwt', JSON.stringify(response.data.jwt));
            }
            return response.data.user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
}
