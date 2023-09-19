import React from 'react';
import { SocialIcon } from 'react-social-icons';
import '../style/Socials.css';

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
        </>
    );
}

export default Landing;