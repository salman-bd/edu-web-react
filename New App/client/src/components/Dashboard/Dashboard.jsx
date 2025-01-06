import React, { useState } from "react";  
import { useNavigate } from "react-router-dom";  
import Spinner from "../UtilComponents/Spinner";


export default function Dashboard() {  
    const navigate = useNavigate()
    const [pin, setPin] = useState(null);  
    const [error, setError] = useState("");  
    const [loading, setLoading] = useState(false);  
     

    const handleChange = (event) => {  
        const { value } = event.target;  
        setPin(value);  
    };  

    const handleSubmit = async (event) => {  
      event.preventDefault();  
      
      if (!pin) {  
        setError("Please enter the pin number.");  
        return;  
    } else if (pin !== 'csc@123') {  
        setError("Your entered incorrect pin.");  
        return;  
    } else if (pin) {
        navigate("/dashboard-details");
    }
      
      setError(null);  
    }; 



  return (  
      <div className="flex flex-col items-center justify-center m-12 py-16 bg-white   max-w-7xl">
        <div className="mb-4 border-2 border-red-900 p-4 rounded-lg lg:w-2/3"> 
            <h2 className="text-3xl text-green-700 font-bold mb-4"> The Page is accessible only for the officials</h2>
            <h2 className="text-2xl text-red-700 font-bold mb-2"> Do not try to get access if you are not an administrative one </h2>
        </div> 

        <div className="flex flex-col gap-4 border p-4 rounded-md border-gray-400 shadow-lg w-full md:w-2/3 lg:w-2/3">
            <label className="block text-cyan-900 text-5xl lg:text-3xl font-bold mb-2 shadow-sm" htmlFor="text">  
                Enter Secret Pin  
            </label>  
            <input  
                id="pin"  
                type="text"  
                value={pin}  
                onChange={handleChange}  
                className="text-3xl lg:text-lg shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"  
                placeholder="Type the secret pin ....."  
            />  
            {error && <p className="text-3xl lg:text-lg text-red-500 italic mb-4">{error}</p>}  
            <button  
                onClick={handleSubmit}  
                className={`text-4xl lg:text-2xl bg-blue-700 hover:bg-blue-600 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}  
                disabled={loading}  
            >  
                {loading ? <Spinner/> : 'Go For Dashboard Access'}  
            </button>
        </div>
      </div>  
  );   
}