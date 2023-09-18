import React, {useState, useEffect} from 'react';
import {getGitRepos} from '../services/GithubService';
import ProjectCard from '../components/ProjectCard';

function Projects() {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        getGitRepos()
            .then(res => {
                const data = res.data.sort((a: { name: number; }, b: { name: number; }) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
                setData(data);
            })
            .finally(() => setIsLoading(false));
    }, []);

    return isLoading ? (
        <>
            <h1>Projects page</h1>
        </>
    ) : (
        <>
            <h1>Projects found: {data.length}</h1>
            {data.map(d => {
                return <ProjectCard key={d.name} githubProject={d}/>;
            })}
        </>
    );
}

export default Projects;