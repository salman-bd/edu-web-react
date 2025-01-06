import React, { useEffect, useState } from "react";  
import axios from 'axios';  
import { useNavigate } from "react-router-dom";  
import useAuthStore from "../../store/authStore";  
import Modal from "../UtilComponents/Modal";  
import Spinner from "../UtilComponents/Spinner";  

export default function Login() {  
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  
  const [loading, setLoading] = useState(false);  
  
  const login = useAuthStore((state) => state.login);  
  const signup = useAuthStore((state) => state.signup);   
  const isLoggingIn = useAuthStore((state) => state.isLoggingIn);  
 
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [modalMessage, setModalMessage] = useState('');  
  const [successTitle, setSuccessTitle] = useState('');  
  const [failureTitle, setFailureTitle] = useState('');  
  const [onClose, setOnClose] = useState(null);  
  const [onCloseText, setOnCloseText] = useState("");  
  const [redirect, setRedirect] = useState(false);  
  const [redirectBtnText, setRedirectBtnText] = useState("");  
  const [redirectFunction, setRedirectFunction] = useState(null);  

  useEffect(() => {  
    setOnClose(() => closeModal); // Set onClose only once  
  }, []); // Empty dependency array means this runs once on mount  

  const closeModal = () => {  
    setIsModalOpen(false);  
    // Optionally navigate or reset form state here  
  };   

  const handleSubmit = async (event) => {  
    event.preventDefault();   
   
    if (!email || !password) {  
      setFailureTitle("All Fields Require!");  
      setModalMessage("Please enter all required information");  
      setIsModalOpen(true);  
      setOnCloseText("OK");  
      setSuccessTitle("");  
      return;    
    }  
    
    const newData = { email, password };  
    setLoading(true);  

    try {  
      const response = await axios.post(`${apiUrl}/api/v1/users/login`, newData);
        // console.log("Login Response: ", response.data);  

        if (response.data.success) {  
          login(newData);  
          signup(newData);  
          setSuccessTitle("Log In Successful");  
          setModalMessage(`Go For Registration`);  
          setIsModalOpen(true);   
          setRedirect(true);  
          setRedirectBtnText("Registration Now");  
          setOnCloseText("Cancel");  
          setRedirectFunction(() => directRegistrationPage);  
          setFailureTitle("");   
        }   
    } catch (error) {  
        const errorMsg = error.response?.data?.message || "Network error: Unable to connect to server.";  
        if (errorMsg === "userNotSignedUp") {  
          setFailureTitle("You are not Signed Up");  
          setModalMessage("Before log in, please complete signing up");   
          setIsModalOpen(true);  
          setOnCloseText("Cancel");  
          setRedirect(true);  
          setRedirectBtnText("Sign Up");  
          setRedirectFunction(() => directSignUpPage);  
          setSuccessTitle("");  
        } else if (errorMsg === "invalidPassword") {  
          setModalMessage("Please enter correct password");  
          setFailureTitle("Incorrect password");    
          setIsModalOpen(true);  
          setSuccessTitle("");
          setOnCloseText("OK");
        }  
    } finally {  
      setLoading(false);  
    }  
  };   

  const directRegistrationPage = () => {  
    navigate("/registration");  
  };  

  const directSignUpPage = () => {  
    navigate("/signup");  
  }; 


  const loginWithGoogle = async () => {  
    try {
      console.log("VITE_API_URL", apiUrl);
      
      // Replace the URL with your backend OAuth endpoint for Google login  
      const googleAuthUrl = `${apiUrl}/api/v1/auth`;
      const response = await axios.get(googleAuthUrl);
      console.log("Response after sending google request: ", response);
      
      navigate("/") // Redirect to the Google login page 
    } catch (error) {
      console.log("Error response after sendin google request: ", error);
    }
 
  };

  return (
    <div>
      <div>
      {/* Modal Component */}  
      {isModalOpen && <Modal   
          isOpen={isModalOpen}   
          onClose={onClose}
          successTitle={successTitle}
          failureTitle={failureTitle}
          message={modalMessage}
          redirect={redirect}
          redirectBtnText={redirectBtnText}
          redirectFunction={redirectFunction}
          onCloseText={onCloseText}
          onConfirm={onClose}  // Close the modal on confirm  
      />
      }
      </div>

      <div>
        <form onSubmit={handleSubmit} disabled={isLoggingIn}>  
          <div className="m-auto mt-10 flex-col p-6 w-full lg:w-1/2 lg:px-10">
            <div className="w-full">  
              <h1 className="mb-2 text-3xl lg:text-4xl font-extrabold text-blue-800">Log in</h1>  
              <p className="text-xs text-black-400">Enter your email and passord to log into your account</p>  
            </div> 

            <div className="flex w-full flex-col items-start justify-start gap-4">  
              <div className="flex w-full flex-col items-start justify-start gap-2">  
                <label htmlFor="email">Email:</label>  
                <input   
                  type="email"   
                  id="email"   
                  name="email"   
                  value={email}   
                  onChange={(e) => setEmail(e.target.value)}  
                  className="w-full border-[1px] rounded-md border-gray-500 bg-white p-3 text-black-500 placeholder:text-gray-500  focus:border-red-900 focus:outline-none"  
                />  
              </div>  

              <div className="flex w-full flex-col items-start justify-start gap-2">  
                <label htmlFor="password">Password:</label>  
                <input   
                  type="password"   
                  id="password"   
                  name="password"   
                  value={password}   
                  onChange={(e) => setPassword(e.target.value)}  
                  className="w-full border-[1px] rounded-md border-gray-500 bg-white p-3 text-black-500 placeholder:text-gray-500  focus:border-red-900 focus:outline-none"  
                />  
              </div>

              <div className="inline-flex w-full items-center justify-between">
                <div className="mr-4 flex items-center">
                  <input
                    type="checkbox"
                    id="checkbox-1"
                    name="checkbox-1"
                    className="absolute h-6 w-6 cursor-pointer opacity-0 [&:checked+div]:bg-blue-700 [&:checked+div_svg]:block"
                  />
                  <div className="mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center border-[1px] border-gray-600 rounded-sm bg-transparent focus-within:border-white">
                    <svg
                      className="pointer-events-none hidden h-3 w-3 fill-current text-blue"
                      version="1.1"
                      viewBox="0 0 17 12"
                      xmlns="http:www.w3.org/2000/svg"
                    >
                      <g fill="none" fillRule="evenodd">
                        <g
                          transform="translate(-9 -11)"
                          fill="#000000"
                          fillRule="nonzero"
                        >
                          <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label
                      htmlFor="checkbox-1"
                      className="text-sm font-medium text-black-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>

                <p className="cursor-pointer text-sm text-black-300 hover:underline">
                  Forgot password?
                </p>
              </div>

              <div className="flex w-full mt-4">
                <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-800 hover:bg-blue-700 p-3 rounded-md text-center text-white font-bold transition-all duration-150 ease-in-out">
                  {loading? <Spinner/> : "Log in"}
                </button> 
              </div>
              
              <div>
            </div>
            </div>  
          </div>
        </form> 

        <div className="m-auto flex-col gap-4 p-6 w-full lg:w-1/2 lg:px-10">
          <div >
            <hr className="w-full border-[0.1px] border-gray-600" />
            <p className="text-sm">OR</p>
            <hr className="w-full border-[0.1px] border-gray-600" />
          </div>
              
          <div className="flex flex-col gap-4 mt-4">
            <button 
              onClick={loginWithGoogle}
              className="inline-flex w-full items-center justify-center gap-3 border-[1px] rounded-md border-blue-700 bg-white p-3 text-center text-black blue-500 hover:border-blue-700 hover:bg-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>{" "}
                Login with Google
            </button>

            
            
          </div>
        </div>
      </div> 
    </div>
  );  
}


<button className="inline-flex w-full items-center justify-center gap-3 border-[1px] rounded-md border-blue-700 bg-white p-3 text-center text-black hover:bg-blue-100">

<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
<linearGradient id="awSgIinfw5_FS5MLHI~A9a_yGcWL8copNNQ_gr1" x1="6.228" x2="42.077" y1="4.896" y2="43.432" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0d61a9"></stop><stop offset="1" stop-color="#16528c"></stop></linearGradient><path fill="url(#awSgIinfw5_FS5MLHI~A9a_yGcWL8copNNQ_gr1)" d="M42,40c0,1.105-0.895,2-2,2H8c-1.105,0-2-0.895-2-2V8c0-1.105,0.895-2,2-2h32	c1.105,0,2,0.895,2,2V40z"></path><path d="M25,38V27h-4v-6h4v-2.138c0-5.042,2.666-7.818,7.505-7.818c1.995,0,3.077,0.14,3.598,0.208	l0.858,0.111L37,12.224L37,17h-3.635C32.237,17,32,18.378,32,19.535V21h4.723l-0.928,6H32v11H25z" opacity=".05"></path><path d="M25.5,37.5v-11h-4v-5h4v-2.638c0-4.788,2.422-7.318,7.005-7.318c1.971,0,3.03,0.138,3.54,0.204	l0.436,0.057l0.02,0.442V16.5h-3.135c-1.623,0-1.865,1.901-1.865,3.035V21.5h4.64l-0.773,5H31.5v11H25.5z" opacity=".07"></path><path fill="#fff" d="M33.365,16H36v-3.754c-0.492-0.064-1.531-0.203-3.495-0.203c-4.101,0-6.505,2.08-6.505,6.819V22h-4v4	h4v11h5V26h3.938l0.618-4H31v-2.465C31,17.661,31.612,16,33.365,16z"></path>
</svg>
Sign Up with Facebook
</button>