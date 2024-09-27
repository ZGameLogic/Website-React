import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../style/ProjectCard.css';

function ProjectBookmark(props){
    return <>
        <Card className='project-bookmark'>
            <Card.Title className='project-title'>
                <Link to={`/projects/${props.githubProject.name}`}>{props.githubProject.name.replaceAll('-', ' ')}</Link>
            </Card.Title>
        </Card>
    </>;
}

ProjectBookmark.propTypes = {
    githubProject: PropTypes.shape({
        commits: PropTypes.arrayOf(PropTypes.shape({
            authorName: PropTypes.string,
            commitMessage: PropTypes.string,
            url: PropTypes.string
        })),
        description: PropTypes.string,
        name: PropTypes.string,
        url: PropTypes.string,
        updatedAt: PropTypes.string
    })
};

export default ProjectBookmark;