
import "../login.css";
import logo from "../logo.png";

import React, { useState, useContext, useReducer } from "react";
import { FirebaseContext } from '../store/Contexts';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { AuthContext } from '../store/Contexts';
import Signup from "./Login";

const Register = () => {
    const { setSignin, signin } = useContext(AuthContext);
    const { auth, firestore } = useContext(FirebaseContext);
    const [errors, setErrors] = useState({});
    
    const reducer = (current, action) => {
        switch (action.type) {
            case 'CHANGE_EMAIL':
                return { ...current, email: action.payload };
            case 'CHANGE_PASSWORD':
                return { ...current, password: action.payload };
            default:
                return current;
        }
    };

    const [state, dispatch] = useReducer(reducer, {
        email: '',
        password: ''
    });

    const emailChange = (e) => {
        const { value } = e.target;
        dispatch({ type: 'CHANGE_EMAIL', payload: value });
    };

    const passChange = (e) => {
        dispatch({ type: 'CHANGE_PASSWORD', payload: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};

        // Validate email
        if (state.email.trim() === '') {
            errors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(state.email)) {
            errors.email = 'Email is not valid';
        }

        // Validate password
        if (state.password === '') {
            errors.password = 'Password is required';
        }

        // If there are validation errors, update the state and return
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        // Perform user authentication and database operation
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                state.email,
                state.password
            );
            // Signed in
            const user = userCredential.user;
            console.log(user);
            await addDoc(collection(firestore, 'users'), {
                email: state.email,
                password: state.password,
            });
            setSignin(!signin);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/email-already-in-use') {
                errors.invalid = "Already registered";
                setErrors(errors);
            }
            console.error(errorCode, errorMessage);
        }
    };

    return (
        <div className="loginScreen">
            <div className="loginScreen_background">
                <img className="loginScreenLogo" src={logo} alt=""></img>
                <button className="loginscreen_button" onClick={() => setSignin(!signin)}>Sign {signin ? 'Up' : 'In'}</button>
                <div className="loginscreen_gradient"></div>
            </div>
            <div className="loginscren__body">
                {signin ? (
                    <>
                        <h1>Unlimited movies, TV shows and more</h1>
                        <h2>Starts at ₹149. Cancel anytime.</h2>
                        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                        <div className="loginscreen_input">
                            <form onSubmit={handleSubmit}>
                                <input type="email" placeholder="Email Address" value={state.email} onChange={emailChange} />
                                <input type="password" placeholder="Password" value={state.password} onChange={passChange} />
                                <button className="loginscreen_getstarted" type="submit">GET STARTED</button>
                            </form>
                        </div>
                        <h3>
                {errors.invalid
                    ? errors.invalid
                    : (errors.password || errors.email)
                        ? "Invalid email or password"
                        : null}
            </h3>
                    </>
                ) : (
                    <Signup />
                )}
            </div>
        </div>
    );
};

export default Register;
