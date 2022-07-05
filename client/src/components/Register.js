import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';
import { register } from '../actions/auth';

const required = (value) => {
    if (!value) {
        return(
            <div className='alert alert-danger' role='alert'>
                Esse campo deve ser preenchido!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)){
        return (
            <div className='alert alert-danger' role='alert'>
                Esse não é um email válido.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className='alert alert-danger' role='alert'>
                O usuário deve possuir entre 3 e 20 caracteres.
            </div>
        );
    }
}

const vdiscordid = (value) => {
    if (value.length < 5) {
        return (
            <div className='alert alert-danger' role='alert'>
                DiscordID Inválido.
            </div>
        );
    }
}

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40){
        return (
            <div className='alert alert-danger' role='alert'>
                A senha deve estar entre 6 e 40 caracteres.
            </div>
        );
    }
}

const Register = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [discordID, setDiscordID] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    
    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    }
    
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const onChangeDiscordID = (e) => {
        const discordID = e.target.value;
        setDiscordID(discordID)
    }
    
    const handleRegister = (e) => {
        e.preventDefault();
        setSuccessful(false);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0){
            dispatch(register(username, email, password, discordID))
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
        }
    };

    return (
        <div className='col-md-12'>
            <div className='card card-container'>
                <img 
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className='profile-img-card'
                />
                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>
                            <div className='form-group'>
                                <label htmlFor='username'>Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required, vusername]}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, validEmail]}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='discordID'>DiscordID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="discordID"
                                    value={discordID}
                                    onChange={onChangeDiscordID}
                                    validations={[required, vdiscordid]}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required, vpassword]}
                                />
                            </div>
                            <div className='form-group'>
                                <button className='btn btn-primary btn-block'>Sign Up</button>
                            </div>
                        </div>
                    )}
                    {message && (
                            <div className='form-group'>
                                <div className={successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                    {message}
                                </div>
                            </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    )

   
};

export default Register;