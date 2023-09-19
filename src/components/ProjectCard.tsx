import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import '../style/ProjectCard.css';
import {SocialIcon} from 'react-social-icons';

function ProjectCard(props) {
    const {githubProject} = props;

    return (
        <div className={'project-card'}>
            <Card border={'dark'} className={'text-center'}>
                <Card.Body>
                    <Card.Title>{githubProject.name}</Card.Title>
                    <Card.Text>{githubProject.description}</Card.Text>
                    <SocialIcon className='social-icon' url={githubProject.url}/>
                </Card.Body>
                <Card.Footer>Last updated: {githubProject.updatedAt}</Card.Footer>
            </Card>
        </div>
    );
}

ProjectCard.propTypes = {
    githubProject: PropTypes.shape({
        description: PropTypes.string,
        name: PropTypes.string,
        url: PropTypes.string,
        updatedAt: PropTypes.string
    })
};

export default ProjectCard;
