import React, {useState} from 'react';
import {Button, Card, FloatingLabel, Form, FormGroup, Spinner, Toast, ToastContainer} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import '../style/Form.css';
import {sendMessage} from '../services/ZGameLogicAPI';

function ContactMeForm(){

    const {register, handleSubmit, formState: {errors }} = useForm();
    const [isSubmittingForm, setIsSubmittingForm] = useState(false);
    
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);

    const onSubmit = data => {
        setIsSubmittingForm(true);
        sendMessage(data.name, data.email, data.message).then((response) => {
            setIsSubmittingForm(false);
            if(response.status !== 200) {
                setError(`Returned with status code: ${response.status}`);
                setShowError(true);
                return;
            }
            if(!response.data.success){
                setError(`Returned with error: ${response.data.message}`);
                setShowError(true);
                return;
            }
        });
    };

    const clearError = () => {
        setShowError(false);
    };

    return (
        <>
           <ToastContainer position={'top-center'}>
                <Toast show={showError} onClose={clearError} animation={true} bg={'danger'} >
                    <Toast.Header>
                        <strong className="me-auto">Error submitting message</strong>
                    </Toast.Header>
                    <Toast.Body>{error}</Toast.Body>
                </Toast>
           </ToastContainer>
            <Card bg={'secondary'} border={'dark'} className={'text-center form-card'}>
                <Card.Body>
                    <Card.Title>Contact Me</Card.Title>
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
                        <Button type='submit' variant='dark' disabled={isSubmittingForm}>
                            Submit
                            {isSubmittingForm ?
                                <Spinner size={'sm'}/> : <></>
                            }
                        </Button>
                    </form>
                </Card.Body>
            </Card>
        </>
    );
}

export default ContactMeForm;