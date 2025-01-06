import React, { useState } from "react";  
import { useNavigate } from "react-router-dom";  
import Spinner from "../UtilComponents/Spinner";


export default function AdmitCard() {  
    const navigate = useNavigate()
    const [registrationNumber, setRegistrationNumber] = useState(null);  
    const [error, setError] = useState("");  
    const [loading, setLoading] = useState(false);  
     

    const handleChange = (event) => {  
        const { value } = event.target;  
        setRegistrationNumber(value);  
    };  

    const handleSubmit = async (event) => {  
      event.preventDefault();  
      
      if (!registrationNumber) {  
          setError("Please enter your registration number.");  
          return;  
      }  
      
      setError(null);  
      setLoading(true);  
      
      console.log("Registration number: ", registrationNumber);

      // Navigate to the DownloadAdmitCard page with registration number  
      navigate("/download-admitcard", { state: { registrationNumber } });  
      
      setLoading(false);  
    }; 

    const SearchAdmitCard = () => {
        navigate("/search-admitcard");
    }

  return (  
      <div className="flex flex-col items-center justify-center m-12 py-16 bg-white   max-w-7xl">
        <div className="mb-4"> 
            <h2 className="text-2xl text-green-700 font-bold mb-4">Download Your Admit Card</h2>
        </div> 

        <div className="flex flex-col gap-4 border p-4 rounded-md border-gray-400 shadow-lg w-full md:w-1/2 lg:w-1/2">
            <label className="block text-cyan-900 text-lg font-bold mb-2 shadow-sm" htmlFor="registrationNumber">  
                Enter Your Registration Number  
            </label>  
            <input  
                id="registrationNumber"  
                type="text"  
                value={registrationNumber}  
                onChange={handleChange}  
                className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"  
                placeholder="Type Registraiton number....."  
            />  
            {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}  
            <button  
                onClick={handleSubmit}  
                className={`bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}  
                disabled={loading}  
            >  
                {loading ? <Spinner/> : 'Download Admit Card'}  
            </button>
        </div>
        <button
        onClick={SearchAdmitCard}
        className="mt-2 text-red-900 hover:text-red-700">
            Forgot Registration Number?
        </button>
      </div>  
  );   
}