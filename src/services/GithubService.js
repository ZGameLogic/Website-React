import axios from 'axios';
export function getGitRepos() {
    return axios.get('https://zgamelogic.com:2006/github/projects');
}