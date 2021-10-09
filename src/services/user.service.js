import { authHeader } from '../helpers/auth-header.js';
import axios from 'axios';
import { useUser } from 'contexts/UserContext.js';
import  React  from "react";

const SomeComponent = () => {
    const {activeUser} = useUser();

    React.useEffect(() => {
        console.log(activeUser)
    }, [login])
  
    return (
      <div className="div"></div>
    );
  };

export const userService = {
    login,
    logout,
    getAll
};
function login(username, password) {
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
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}