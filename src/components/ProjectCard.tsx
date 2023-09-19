import React from 'react';
import PropTypes from 'prop-types';
import {Card, Table} from 'react-bootstrap';
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
                    <Card.Text>Recent commits</Card.Text>
                    <Table striped bordered responsive variant='dark' size='sm'>
                        <thead>
                        <tr>
                            <th>Author</th>
                            <th>Message</th>
                            <th>Commit Link</th>
                        </tr>
                        </thead>
                        <tbody>
                        {githubProject.commits.map(commit => {
                            return (<tr key={commit.url}>
                                <td>{commit.authorName}</td>
                                <td>{commit.commitMessage}</td>
                                <td>
                                    <SocialIcon className='social-icon' url={commit.url}/>
                                </td>
                            </tr>);
                        })}
                        </tbody>
                    </Table>
                    <div>
                        <p>Repository link: </p>
                        <SocialIcon className='social-icon' url={githubProject.url}/>
                    </div>
                </Card.Body>
                <Card.Footer>Last updated: {githubProject.updatedAt}</Card.Footer>
            </Card>
        </div>
    );
}

ProjectCard.propTypes = {
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

export default ProjectCard;
