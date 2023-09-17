import axios from 'axios';

export async function getGitRepos() {
    return axios.get('https://api.github.com/orgs/zgamelogic/repos');
}