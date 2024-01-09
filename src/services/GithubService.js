import axios from 'axios';
export function getGitRepos() {
    return axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/github/projects`);
}