import React, { useState } from 'react';  
import useAuthStore from '../../store/authStore';

const AuthComponent = () => {  
  const {  
    isAuthenticated,  
    user,  
    login,  
    logout,  
    signup,  
    isLoggingIn,  
    isSigningUp,  
  } = useAuthStore();  

  // Local state to manage form inputs  
  const [formData, setFormData] = useState({  
    name: '',  
    email: '',  
  });  
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between Login and Signup  

  // Handle input changes  
  const handleChange = (e) => {  
    const { name, value } = e.target;  
    setFormData((prev) => ({ ...prev, [name]: value }));  
  };  

  const handleSubmit = (e) => {  
    e.preventDefault();  
    if (isLoginMode) {  
      login({ name: formData.name, email: formData.email }); // Pass the necessary data  
    } else {  
      signup({ name: formData.name, email: formData.email });  
    }  
  };  

  const toggleMode = () => {  
    setIsLoginMode((prev) => !prev); // Toggle between login and signup  
    setFormData({ name: '', email: '' }); // Clear the form on toggle  
  };  

  return (  
    <div>  
      {isAuthenticated ? (  
        <div>  
          <h1>Welcome, {user.name}!</h1>  
          <button onClick={logout}>Logout</button>  
        </div>  
      ) : (  
        <div>  
          <h1>{isLoginMode ? 'Login' : 'Sign Up'}</h1>  
          <form onSubmit={handleSubmit}>  
            {!isLoginMode && (  
              <>  
                <input  
                  type="text"  
                  name="name"  
                  value={formData.name}  
                  onChange={handleChange}  
                  placeholder="Name"  
                  required  
                />  
              </>  
            )}  
            <input  
              type="email"  
              name="email"  
              value={formData.email}  
              onChange={handleChange}  
              placeholder="Email"  
              required  
            />  
            <button type="submit" disabled={isLoggingIn || isSigningUp}>  
              {isLoginMode ? (isLoggingIn ? 'Logging in...' : 'Login') : (isSigningUp ? 'Signing up...' : 'Sign Up')}  
            </button>  
          </form>  
          <p>  
            {isLoginMode  
              ? 'Need an account?'  
              : 'Already have an account?'}{' '}  
            <button onClick={toggleMode}>  
              {isLoginMode ? 'Sign Up' : 'Login'}  
            </button>  
          </p>  
          {isLoggingIn && <p>Logging in...</p>}  
          {isSigningUp && <p>Signing up...</p>}  
        </div>  
      )}  
    </div>  
  );  
};  

export default AuthComponent;