import React from 'react';
import { SocialIcon } from 'react-social-icons';
import '../style/Socials.css';
import '../style/Form.css';
import {useForm} from 'react-hook-form';
import {Button, FloatingLabel, Form, FormGroup} from 'react-bootstrap';

function Landing() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => console.log(data);

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
                        <Form.Control.Feedback type='invalid' className='search-user'>
                            {errors.name?.message}
                        </Form.Control.Feedback>
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
                                {...register('email', {required: true})}
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
                                {...register('message', {required: true, maxLength: 8000})}
                                isInvalid={!!errors.message}
                            />
                        </FloatingLabel>
                    </FormGroup>
                    <Button type='submit'>Submit</Button>
                </form>
            </div>
        </>
    );
}

export default Landing;

// <Form.Group className='mx-2 search-table-filter'>
//
//     <Form.Label id='user-id-input'>UserID</Form.Label>
//
//     <Form.Control
//
//         id='user-id'
//
//         value={userId}
//
//         {...register('userId', {
//
//             pattern: {
//
//                 value: xIDRegex,
//
//                 message: UserIdError,
//
//             },
//
//         })}
//
//         isInvalid={!!errors.userId}
//
//         onChange={(e: any) => setUserId(e.target.value)}
//
//         type='search'
//
//         className='uxf-search-bar'
//
//         placeholder='Enter UserId...'
//
//     />
//
//     <Form.Control.Feedback type='invalid' className='search-user'>
//
//         {errors.userId?.message}
//
//     </Form.Control.Feedback>
//
// </Form.Group>