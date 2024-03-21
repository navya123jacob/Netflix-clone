import React, { useState, useContext, useReducer } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

import { AuthContext, FirebaseContext } from '../store/Contexts';

const Signup = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { auth } = useContext(FirebaseContext);
  const [errors, setErrors] = useState({});
  const {user,setUser}=useContext(AuthContext)
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
    email: '', // Set initial email value to empty string
    password: '' // Set initial password value to empty string
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
    if (!state.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(state.email)) {
      errors.email = 'Email is not valid';
    }

    // Validate password
    if (!state.password.trim()) {
      errors.password = 'Password is required';
    }

    // If there are validation errors, update the state and return
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Perform user authentication and database operation
    try {
      const credentials = await signInWithEmailAndPassword(auth, state.email, state.password);
      setUser(credentials)
    } catch (error) {
      errors.email = 'Invalid email and password';
      setErrors(errors);
      console.error(error.code, error.message);
    }
  };

  return (
    <>        
      <div className="Signupscreen">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <input 
            placeholder="Email" 
            type="email" 
            value={state.email} 
            onChange={emailChange} 
          />
          {errors.email && <p>{errors.email}</p>}
          <input 
            placeholder="Password" 
            type="password" 
            value={state.password} 
            onChange={passChange} 
          />
          {errors.password && <p>{errors.password}</p>}
          {errors.invalid && <p>{errors.invalid}</p>}
          <button type="submit">Sign Up</button>
          <h6><span className="singupscreen_grey">Already have an account?</span> Sign In now.</h6>
        </form>
      </div>
    </>
  );
};

export default Signup;
