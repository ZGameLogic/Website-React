import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import '../style/ProjectCard.css';

function ProjectCard(props) {
    const {githubProject} = props;

    return (
        <div className={'project-card'}>
            <Card border={'dark'} style={{ width: '50%', margin: 'auto' }} className={'text-center'}>
                <Card.Body>
                    <Card.Title>{githubProject.name}</Card.Title>
                    <Card.Text>{githubProject.description}</Card.Text>
                    <Button href={githubProject.url} variant="dark">Repository Link</Button>
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
