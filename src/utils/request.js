import axios from 'axios';

const requestContent = axios.create({
    baseURL: 'https://localhost:44341/api/',
});

export { requestContent };
