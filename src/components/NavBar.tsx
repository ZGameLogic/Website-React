import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap';

function NavScrollExample() {
    return (
        <Navbar bg="dark" data-bs-theme="dark" sticky="top" expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <LinkContainer to={'/'}>
                    <Navbar.Brand>Ben Shabowski</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <LinkContainer to={'/'}>
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={'/projects'}>
                            <Nav.Link>Projects</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;