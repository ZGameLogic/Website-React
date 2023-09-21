import axios from 'axios';

export async function sendMessage(name, email, message) {
    return axios.post('https://zgamelogic.com:2006/message', {name, email, message});
}