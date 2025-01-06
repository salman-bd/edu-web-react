import React, { useState, useEffect } from "react";  
import axios from 'axios'; 
import { useUserContext } from "../../context/userContext";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import Modal from "../UtilComponents/Modal";
import Spinner from "../UtilComponents/Spinner";


export default function SignUpForm() {  
  const [formData, setFormData] = useState({  
    fullName: "",  
    email: "",  
    password: "",  
    confPassword: ""  
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const signup = useAuthStore((state) => state.signup);  
  const isSigningUp = useAuthStore((state) => state.isSigningUp); 

  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [modalMessage, setModalMessage] = useState('');  
  const [successTitle, setSuccessTitle] = useState('');
  const [failureTitle, setFailureTitle] = useState('');
  const [onCloseText, setOnCloseText] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [redirectBtnText, setRedirectBtnText] = useState("");
  const [redirectFunction, setRedirectFunction] = useState(null);
 
  const closeModal = () => {  
  setIsModalOpen(false);  
  // Optionally navigate or reset form state here  
  };  

  // Handle input changes in the form  
  const handleChange = (event) => {  
      const { name, value } = event.target;  
      setFormData({  
          ...formData,  
          [name]: value  
      });  
  };  

  const handleSubmit = async (event) => {  
      event.preventDefault();  

      if (!formData.fullName || !formData.email || !formData.password || !formData.confPassword) {
        setFailureTitle("All fields are require!");  
        setModalMessage("Please enter all required information");  
        setIsModalOpen(true);  
        setOnCloseText("OK");  
        setSuccessTitle("");  
        return; 
      }

      // Validate passwords match
      if (formData.password !== formData.confPassword) {  
        setFailureTitle("Password not matched!");
        setModalMessage("Please use same password");  
        setIsModalOpen(true);
        setOnCloseText("OK")
        setSuccessTitle("");
        return;
      }
      setLoading(true);

      try {  
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.post(`${apiUrl}/api/v1/users/signup`, formData);
          console.log("Response: ", response);
          
          if (response.status === 200) { 
            signup(formData);
            setSuccessTitle("Sign Up Successful");
            setModalMessage(`Account created successfully! Log in now`);  
            setIsModalOpen(true); 
            setRedirect(true);  
            setRedirectBtnText("Log In");  
            setOnCloseText("Cancel");  
            setRedirectFunction(() => directLogInPage);  
            setFailureTitle(""); 
          }
          else if (response.status === 201) {
            signup(formData);
            setFailureTitle("Already Singned Up!");
            setModalMessage("You are already Signed Up, Please Log In now");
            setRedirect(true);  
            setRedirectBtnText("Log In");  
            setOnCloseText("Cancel");  
            setRedirectFunction(() => directLogInPage);   
            setIsModalOpen(true); 
            setSuccessTitle(""); 
          }

      } catch (error) {  
          // Handle different error scenarios  
          if (error.response) {  
              // console.log("Error: ", error);
              setModalMessage(error.response.data.message || "An error occurred while signing up.");  
              setFailureTitle("Error");  
              setIsModalOpen(true)
              setOnCloseText("OK");
              setSuccessTitle("") 
          } else if (error.request) {  
              // The request was made but no response was received  
              setModalMessage("No response from server.");  
              setFailureTitle("Error");  
              setIsModalOpen(true)
              setOnCloseText("OK");
              setSuccessTitle("")
          } else {  
              // Something happened in setting up the request that triggered an Error 
              setModalMessage("Error: " + error.message);  
              setFailureTitle("Error");  
              setIsModalOpen(true);
              setOnCloseText("OK");
              setSuccessTitle("")
          }  
      } finally {
        setLoading(false)
      }

      const directLogInPage = () => {  
        navigate("/login");  
      }; 
    
  };   

  return (
    <div>
        <div>
            {/* Modal Component */}  
            {isModalOpen && <Modal   
                isOpen={isModalOpen}   
                onClose={closeModal} 
                successTitle={successTitle}
                failureTitle={failureTitle}
                message={modalMessage}
                redirect={redirect}
                redirectBtnText={redirectBtnText}
                redirectFunction={redirectFunction}
                onCloseText={onCloseText}
                onConfirm={closeModal}  // Close the modal on confirm  
            />
            }
        </div>

      <form onSubmit={handleSubmit} disabled={isSigningUp}>  
        <div className="m-auto mt-10 flex flex-col justify-center mx-auto p-6 w-full md:w-1/2 lg:w-1/3 ">  
          <div className="w-full">  
            <h1 className="mb-2 text-4xl font-extrabold text-blue-800">Sign Up</h1>  
            <p className="text-xs text-black-400">Before we start, please log Sign Up</p>  
          </div>  
          
          <div className=" flex w-full flex-col items-start justify-center gap-4">  
            <div className="flex w-full flex-col items-start justify-start gap-2">  
              <label htmlFor="fullName">Full Name</label>  
              <input   
                type="text"   
                id="fullName"   
                name="fullName"   
                value={formData.fullName}   
                onChange={handleChange}  
                className="w-full border-[1px] rounded-md border-gray-500 bg-white p-3 text-black-500 placeholder:text-gray-500  focus:border-red-900 focus:outline-none"  
              />  
            </div>  

            <div className="flex w-full flex-col items-start justify-start gap-2">  
              <label htmlFor="email">Email:</label>  
              <input   
                type="email"   
                id="email"   
                name="email"   
                value={formData.email}   
                onChange={handleChange}  
                className="w-full border-[1px] rounded-md border-gray-500 bg-white p-3 text-black-500 placeholder:text-gray-500  focus:border-red-900 focus:outline-none"  
              />  
            </div>  

            <div className="flex w-full flex-col items-start justify-start gap-2">  
              <label htmlFor="password">Password:</label>  
              <input   
                type="password"   
                id="password"   
                name="password"   
                value={formData.password}   
                onChange={handleChange}  
                className="w-full border-[1px] rounded-md border-gray-500 bg-white p-3 text-black-500 placeholder:text-gray-500  focus:border-red-900 focus:outline-none"  
              />  
            </div>  

            <div className="flex w-full flex-col items-start justify-start gap-2">  
              <label htmlFor="confPassword">Confirm Password:</label>  
              <input   
                type="password"   
                id="confPassword"   
                name="confPassword"   
                value={formData.confPassword}   
                onChange={handleChange}  
                className="w-full border-[1px] rounded-md border-gray-500 bg-white p-3 text-black-500 placeholder:text-gray-500  focus:border-red-900 focus:outline-none"  
              />  
            </div>  

            <div className="flex w-full justify-center">  
              <button type="submit" className="w-full bg-blue-800 hover:bg-blue-700 mt-5 p-3 rounded-md text-center text-white font-bold transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
                {loading ? <Spinner /> : "Create Account"}
              </button>  
            </div>  
          </div>
          
        </div>  
      </form>

      <div className="flex flex-col justify-center mx-auto p-6 gap-4 m-auto w-full md:w-1/2 lg:w-1/3">
        <div>
          <hr className="w-full border-[0.1px] border-gray-600" />
          <p className="text-sm">OR</p>               
          <hr className="w-full border-[0.1px] border-gray-600" />             
        </div>

        <button className="inline-flex w-full items-center justify-center gap-3 border-[1px] rounded-md border-blue-700 bg-white p-3 text-center text-black blue-500 hover:border-blue-700 hover:bg-blue-100">
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
          Sign Up with Google
        </button>

        <button className="inline-flex w-full items-center justify-center gap-3 border-[1px] rounded-md border-blue-700 bg-white p-3 text-center text-black hover:bg-blue-100">

          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
          <linearGradient id="awSgIinfw5_FS5MLHI~A9a_yGcWL8copNNQ_gr1" x1="6.228" x2="42.077" y1="4.896" y2="43.432" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0d61a9"></stop><stop offset="1" stop-color="#16528c"></stop></linearGradient><path fill="url(#awSgIinfw5_FS5MLHI~A9a_yGcWL8copNNQ_gr1)" d="M42,40c0,1.105-0.895,2-2,2H8c-1.105,0-2-0.895-2-2V8c0-1.105,0.895-2,2-2h32	c1.105,0,2,0.895,2,2V40z"></path><path d="M25,38V27h-4v-6h4v-2.138c0-5.042,2.666-7.818,7.505-7.818c1.995,0,3.077,0.14,3.598,0.208	l0.858,0.111L37,12.224L37,17h-3.635C32.237,17,32,18.378,32,19.535V21h4.723l-0.928,6H32v11H25z" opacity=".05"></path><path d="M25.5,37.5v-11h-4v-5h4v-2.638c0-4.788,2.422-7.318,7.005-7.318c1.971,0,3.03,0.138,3.54,0.204	l0.436,0.057l0.02,0.442V16.5h-3.135c-1.623,0-1.865,1.901-1.865,3.035V21.5h4.64l-0.773,5H31.5v11H25.5z" opacity=".07"></path><path fill="#fff" d="M33.365,16H36v-3.754c-0.492-0.064-1.531-0.203-3.495-0.203c-4.101,0-6.505,2.08-6.505,6.819V22h-4v4	h4v11h5V26h3.938l0.618-4H31v-2.465C31,17.661,31.612,16,33.365,16z"></path>
          </svg>
          Sign Up with Facebook
        </button>

        <p className="my-14 text-sm font-light text-black">
          Already Signed up?{" "}
          <span className="cursor-pointer font-bold hover:underline">
            Sign in to your account
          </span>
        </p>

      </div>
    </div>


  );  
}

// const SignUp = () => {
//     return (
//       <div className="min-h-screen bg-white">

//         <div className="mt-10 m-auto flex flex-col w-full p-6 md:w-1/2 lg:w-1/2 lg:px-10">
//           <div className="w-full flex flex-col items-center justify-center">
//             <h1 className="mb-2 text-5xl font-extrabold text-blue-800">
//               Sign Up
//             </h1>
//             <p className="text-sm text-slate-900">
//               Before we start, please create your account 
//             </p>
          
//           </div>
//           <div className="my-14 flex w-full flex-col items-start justify-start gap-4">
//             <div className="flex w-full flex-col items-start justify-start gap-2">
//               <label className="text-sm text-black-300">Full name</label>
//               <input
//                 placeholder="Enter a first name..."
//                 autoComplete="false"
//                 className="w-full border-[1px] rounded-md border-black bg-white p-3 text-black placeholder:text-gray-500"
//               />
//             </div>
            
//             <div className="flex w-full flex-col items-start justify-start gap-2">
//               <label className="text-sm text-black-300">Email</label>
//               <input
//               type="email"
//                 placeholder="Enter an email..."
//                 autoComplete="false"
//                 className="w-full border-[1px] rounded-md border-black bg-white p-3 text-black placeholder:text-gray-500"
//               />
//             </div>

//             <div className="flex w-full flex-col items-start justify-start gap-2">
//               <label className="text-sm text-black-300">Username</label>
//               <input
//                 type="text"
//                 placeholder="Enter a username..."
//                 autoComplete="false"
//                 className="w-full border-[1px] rounded-md border-black bg-white p-3 text-black placeholder:text-gray-500"
//               />
//             </div>
            
//             <div className="flex w-full flex-col items-start justify-start gap-2">
//               <label className="text-sm text-black-300">Password</label>
//               <input
//                 placeholder="Enter a password..."
//                 autoComplete="false"
//                 type="password"
//                 className="w-full border-[1px] rounded-md border-black bg-white p-3 text-black placeholder:text-gray-500"
//               />
//             </div>

//             <div className="flex w-full flex-col items-start justify-start gap-2">
//               <label className="text-sm text-black-300">Confirm Password</label>
//               <input
//                 placeholder="Enter a password..."
//                 autoComplete="false"
//                 type="password"
//                 className="w-full border-[1px] rounded-md border-black bg-white p-3 text-black placeholder:text-gray-500"
//               />
//             </div>
         
//             <button className="w-full bg-blue-800 blue-500 hover:bg-blue-700 mt-5 p-3 rounded-md text-center text-white font-bold  transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
//               Create Account
//             </button>

//             <div className="mx-auto my-3 flex w-full max-w-md items-center justify-center gap-4 text-black">
//               <hr className="w-full border-[0.1px] border-gray-600" />
//               <p className="text-sm">OR</p>
//               <hr className="w-full border-[0.1px] border-gray-600" />
//             </div>

//             <button className="inline-flex w-full items-center justify-center gap-3 border-[1px] rounded-md border-blue-700 bg-white p-3 text-center text-black blue-500 hover:border-blue-700 hover:bg-blue-100">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 width="24"
//               >
//                 <path
//                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                   fill="#4285F4"
//                 />
//                 <path
//                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                   fill="#34A853"
//                 />
//                 <path
//                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                   fill="#FBBC05"
//                 />
//                 <path
//                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                   fill="#EA4335"
//                 />
//                 <path d="M1 1h22v22H1z" fill="none" />
//               </svg>{" "}
//               Sign Up with Google
//             </button>

//             <button className="inline-flex w-full items-center justify-center gap-3 border-[1px] rounded-md border-blue-700 bg-white p-3 text-center text-black hover:bg-blue-100">

//             <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
//             <linearGradient id="awSgIinfw5_FS5MLHI~A9a_yGcWL8copNNQ_gr1" x1="6.228" x2="42.077" y1="4.896" y2="43.432" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0d61a9"></stop><stop offset="1" stop-color="#16528c"></stop></linearGradient><path fill="url(#awSgIinfw5_FS5MLHI~A9a_yGcWL8copNNQ_gr1)" d="M42,40c0,1.105-0.895,2-2,2H8c-1.105,0-2-0.895-2-2V8c0-1.105,0.895-2,2-2h32	c1.105,0,2,0.895,2,2V40z"></path><path d="M25,38V27h-4v-6h4v-2.138c0-5.042,2.666-7.818,7.505-7.818c1.995,0,3.077,0.14,3.598,0.208	l0.858,0.111L37,12.224L37,17h-3.635C32.237,17,32,18.378,32,19.535V21h4.723l-0.928,6H32v11H25z" opacity=".05"></path><path d="M25.5,37.5v-11h-4v-5h4v-2.638c0-4.788,2.422-7.318,7.005-7.318c1.971,0,3.03,0.138,3.54,0.204	l0.436,0.057l0.02,0.442V16.5h-3.135c-1.623,0-1.865,1.901-1.865,3.035V21.5h4.64l-0.773,5H31.5v11H25.5z" opacity=".07"></path><path fill="#fff" d="M33.365,16H36v-3.754c-0.492-0.064-1.531-0.203-3.495-0.203c-4.101,0-6.505,2.08-6.505,6.819V22h-4v4	h4v11h5V26h3.938l0.618-4H31v-2.465C31,17.661,31.612,16,33.365,16z"></path>
//             </svg>
//               Sign Up with Facebook
//             </button>

//             <p className="my-14 text-sm font-light text-black">
//               Already Signed up?{" "}
//               <span className="cursor-pointer font-bold hover:underline">
//                 Sign in to your account
//               </span>
//             </p>

//           </div>
//         </div>
//       </div>
//     );
//   };
  
