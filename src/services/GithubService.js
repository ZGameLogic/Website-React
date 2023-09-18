import axios from 'axios';
export function getGitRepos() {
    return axios.get('https://api.github.com/orgs/zgamelogic/repos');
}

export function getCommitHistory(repository) {
    return axios.get(`https://api.github.com/repos/zgamelogic/${repository}/commits`);
}