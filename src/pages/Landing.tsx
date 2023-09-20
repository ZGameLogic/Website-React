import React from 'react';
import { SocialIcon } from 'react-social-icons';
import '../style/Socials.css';
import '../style/Form.css';
import {useForm} from 'react-hook-form';
import {Button, FloatingLabel, Form, FormGroup} from 'react-bootstrap';

function Landing() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        data.name;
    };

    return(
        <>
            <h1 className='socials'>Social Media</h1>
            <div className='socials'>
                <SocialIcon className='social-icon' url='https://www.facebook.com/benshabowski/'/>
                <SocialIcon className='social-icon' url='https://github.com/zabory'/>
                <SocialIcon className='social-icon' url='https://github.com/ZGameLogic'/>
                <SocialIcon className='social-icon' url='https://www.linkedin.com/in/ben-shabowski-b9005b136/'/>
            </div>
            <h1 className='socials'>Contact Me</h1>
            <div className='socials'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <div className='block'/>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Name"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder=""
                                {...register('name', {required: {
                                    value: true,
                                    message: 'This field is required'
                                }, maxLength: 80})}
                                isInvalid={!!errors.name}
                            />
                        </FloatingLabel>
                    </FormGroup>
                    <FormGroup>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email"
                            className="mb-3"
                        >
                            <Form.Control
                                type="email"
                                placeholder=""
                                {...register('email', {required: {
                                    value: true,
                                    message: 'This field is required'
                                }})}
                                isInvalid={!!errors.email}
                            />
                        </FloatingLabel>
                    </FormGroup>
                    <FormGroup>
                        <FloatingLabel
                            controlId="floatingTextarea"
                            label="Message"
                            className="mb-3"
                        >
                            <Form.Control
                                as="textarea"
                                style={{ height: '100px' }}
                                placeholder="Leave a message here"
                                {...register('message', {required: {
                                    value: true,
                                    message: 'This field is required'
                                }, maxLength: 8000})}
                                isInvalid={!!errors.message}
                            />
                        </FloatingLabel>
                    </FormGroup>
                    <Button type='submit' variant='dark'>Submit</Button>
                </form>
            </div>
        </>
    );
}

export default Landing;