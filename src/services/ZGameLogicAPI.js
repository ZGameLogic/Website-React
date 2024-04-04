import axios from 'axios';

export async function sendMessage(name, email, message) {
    return axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/message`, {name, email, message});
}

export async function getSotData() {
    return axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/sot`);
}