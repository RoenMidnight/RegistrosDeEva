import axios from 'axios';
require('dotenv').config();

const API_URL = process.env.API_URL_AUTH;

const register = (username, email, password, discordId) => {
    return axios.post(API_URL + 'signup', {
        username,
        email,
        discordId,
        password
    });
};

const login = (username, password) => {
    return axios.post(API_URL + 'signin', {
        username,
        password
    })
    .then((response) => {
        if (response.data.accesToken){
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
}

const logout = () => { localStorage.removeItem('user') };

export default {
    register, login, logout
}