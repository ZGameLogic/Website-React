import React from 'react';
import { SocialIcon } from 'react-social-icons';
import '../style/Socials.css';
import ContactMeForm from '../components/ContactMeForm';
import {ListGroup} from 'react-bootstrap';

function Landing() {
    return(
        <>
            <h1 className='socials'>Social Media</h1>
            <div className='socials'>
                <SocialIcon className='social-icon' url='https://www.facebook.com/benshabowski/'/>
                <SocialIcon className='social-icon' url='https://github.com/zabory'/>
                <SocialIcon className='social-icon' url='https://github.com/ZGameLogic'/>
                <SocialIcon className='social-icon' url='https://www.linkedin.com/in/ben-shabowski-b9005b136/'/>
            </div>
            <div className='socials'>
                <h1>Contact Information</h1>
                <ListGroup horizontal className='socials'>
                    <ListGroup.Item>benshabowski@gmail.com</ListGroup.Item>
                    <ListGroup.Item>ben@zgamelogic.com</ListGroup.Item>
                    <ListGroup.Item>(630)-962-6976</ListGroup.Item>
                </ListGroup>
            </div>
            <ContactMeForm/>
        </>
    );
}

export default Landing;