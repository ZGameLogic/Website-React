import React, {useState, useEffect} from 'react';
import {getGitRepos} from '../services/GithubService';
import {Button, Offcanvas, Spinner} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import '../style/ProjectCard.css';

function Projects() {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        getGitRepos()
            .then(res => {
                const data = res.data.sort((a: { name: number; }, b: { name: number; }) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
                setData(data);
                setSelected(data[Math.floor(Math.random() * data.length)]);
            })
            .finally(() => setIsLoading(false));
    }, []);

    function pillSelection(newSelection){
        setSelected(data.filter(d => d.name === newSelection)[0]);
        setShow(false);
    }

    return isLoading ? (
        <>
            <Spinner className='spinner' animation="border" />
        </>
    ) : (
        <>
            <Button
                variant='outline-secondary'
                className={`hamburger-button ${show ? 'pushed' : ''}`}
                onClick={() => setShow(!show)}
            >
                &#9776; Projects
            </Button>

            <h1>{selected.name}</h1>

            <Offcanvas
                menuVariant='dark'
                show={show}
                onHide={() => setShow(false)}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Project Browser</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav variant="pills" className="flex-column" onSelect={pillSelection}>
                        {data.map(d => {
                            return <Nav.Item key={d.name}>
                                <Nav.Link eventKey={d.name}>{d.name}</Nav.Link>
                            </Nav.Item>;
                        })}
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Projects;