import axios from 'axios';
import authHeader from './auth-header';
require('dotenv').config()

const API_URL = process.env.API_URL_TEST || "http://localhost:3000/api/test/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
}

const getMembreBoard = () => {
    return axios.get(API_URL + "membre", { headers: authHeader() });
}

const getCorujaBoard = () => {
    return axios.get(API_URL + "coruja", { headers: authHeader() });
}

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
}

export default {
    getPublicContent,
    getMembreBoard,
    getCorujaBoard,
    getAdminBoard
}