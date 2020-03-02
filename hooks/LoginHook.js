import { useState } from "react"
import validate from 'validate.js';

const constraints = {
    username: {
        presence: true,
        length: {
            minimum: 3,
            message: 'Too short'
        }
    },
    email: {
        presence: true,
        email: {
            message: 'Valid email is required'
        }
    },
    password: {
        presence: true,
        length: {
            minimum: 5,
            message: 'Too short'
        }
    },
    confirmPassword: {
        equality: 'password'
    }
}


const useForms = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});

    const handleUsernameChange = (text) => {
        const error = validate({username: text}, {username: constraints.username});
        setInputs((inputs) => ({
            ...inputs,
            username: text,
        }));
        setErrors((errors) => ({
            ...errors,
            username: error,
        }));
    };

    const handleEmailChange = (text) => {
        const error = validate({email: text}, {email: constraints.email})
        setInputs((inputs) => ({
            ...inputs,
            email: text,
        }));
        setErrors((errors) => ({
            ...errors,
            email: error,
        }));
    };

    const handleFullNameChange = (text) => {
        const error = validate({full_name: text}, {full_name: constraints.full_name})
        setInputs((inputs) => ({
            ...inputs,
            full_name: text,
        }));
        setErrors((errors) => ({
            ...errors,
            full_name: error,
        }));
    };

    const handlePasswordChange = (text) => {
        const error = validate({password: text}, {password: constraints.password})
        setInputs((inputs) => ({
            ...inputs,
            password: text,
        }));
        setErrors((errors) => ({
            ...errors,
            password: error,
        }));
    };

    const handleConfirmPasswordChange = (text) => {
        const error = validate({password: inputs.password, confirmPassword: text}, {confirmPassword: constraints.confirmPassword});
        setInputs((inputs) => ({
            ...inputs,
            confirmPassword: text,
        }));
        setErrors((errors) => ({
            ...errors,
            confirmPassword: error,
        }));
    };

    return {
        handleUsernameChange,
        handleEmailChange,
        handleFullNameChange,
        handlePasswordChange,
        handleConfirmPasswordChange,
        inputs,
        errors,
    }
};

export default useForms;
