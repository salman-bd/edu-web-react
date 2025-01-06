import React, { useState } from "react";  
import axios from 'axios';  
import { useNavigate } from "react-router-dom";  
import Modal from "../UtilComponents/Modal";  
import Spinner from "../UtilComponents/Spinner";  

export default function SearchAdmitCard() {  
  const navigate = useNavigate();   

  const [fullName, setFullName] = useState("");  
  const [institutionName, setInstitutionName] = useState("");  
  const [grade, setGrade] = useState("");  
  const [loading, setLoading] = useState(false);  
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [modalMessage, setModalMessage] = useState('');  
  const [successTitle, setSuccessTitle] = useState('');  
  const [failureTitle, setFailureTitle] = useState('');  
  // Removed onClose from state  
  const [onCloseText, setOnCloseText] = useState("");  

  // Define closeModal function directly  
  const closeModal = () => {  
    setIsModalOpen(false);  
    // Optionally navigate or reset form state here  
  };   

  const handleSubmit = async (event) => {  
    event.preventDefault();   

    if (!fullName || !institutionName || !grade) {  
      setFailureTitle("All Fields Require!");  
      setModalMessage("Please enter all required information");  
      setIsModalOpen(true);  
      setOnCloseText("OK");  
      setSuccessTitle("");  
      return;    
    }  
    
    const newData = { fullName, institutionName, grade }; 
    console.log("Data to search admit card: ", newData);
    
    setLoading(true);

    try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.post(`${apiUrl}/api/v1/registration/search-admitcard`, newData); 
        const specialData = response?.data?.data;
        console.log("Response data when admit card is searched: ", specialData);
        
        navigate("admitcard-searchresult", { state: { specialData }});  

    } catch (error) {  
        setFailureTitle("Information didn't match");   
        setModalMessage("Before trying again, please ensure exact information what input during registration");   
        setIsModalOpen(true);  
        setOnCloseText("Cancel");  
        setSuccessTitle("");  
    } finally {  
      setLoading(false);  
    }  
  };   

  return (  
    <div>  
      {/* Modal Component */}  
      {isModalOpen && <Modal   
          isOpen={isModalOpen}   
          onClose={closeModal} // Pass the function directly  
          successTitle={successTitle}  
          failureTitle={failureTitle}  
          message={modalMessage}  
          onCloseText={onCloseText}  
          onConfirm={closeModal}  // Close the modal on confirm  
      />}  
        
        <div className="mt-6 lg:mt-10 lg:px-16 p-3 mx-auto w-full max-w-7xl">
            <form onSubmit={handleSubmit}>  
                <div className="m-auto mt-10 flex-col p-6 w-full lg:w-1/2">  
                    <div className="w-full mb-6">  
                        <h1 className="mb-2 text-3xl lg:text-4xl font-extrabold text-blue-800">Search Admit Card</h1>  
                        <p className="text-xs text-black-400">Enter your name, institution name and class to find out Admit Card</p>  
                    </div>   

                    <div className="flex w-full flex-col items-start justify-start gap-4">  
                        <div className="flex w-full flex-col items-start justify-start gap-2">  
                            <label htmlFor="fullName">Full Name:</label>  
                            <input   
                                type="text"   
                                id="fullName"   
                                name="fullName"   
                                value={fullName}   
                                onChange={(e) => setFullName(e.target.value)}  
                                placeholder="Type your exact full name...."  
                                className="w-full border-[1px] rounded-md border-gray-500 bg-white p-3 text-black-500 placeholder:text-gray-500  focus:border-red-900 focus:outline-none"  
                            />  
                        </div>  

                        <div className="flex w-full flex-col items-start justify-start gap-2">  
                            <label htmlFor="institutionName">Institution Name:</label>  
                            <input   
                                type="text"   
                                id="institutionName"   
                                name="institutionName"   
                                value={institutionName}   
                                onChange={(e) => setInstitutionName(e.target.value)}   
                                placeholder="Type your institution name...."   
                                className="w-full border-[1px] rounded-md border-gray-500 bg-white p-3 text-black-500 placeholder:text-gray-500  focus:border-red-900 focus:outline-none"  
                            />  
                        </div>  

                        <div className="flex w-full flex-col items-start justify-start gap-2">  
                            <label htmlFor="grade">Class</label>  
                            <div className="w-full ">  
                                <select  
                                    name="grade"  
                                    id="grade"  
                                    value={grade}  
                                    onChange={(e) => setGrade(e.target.value)}  
                                    className="w-full border-[1px] rounded-sm border-gray-500 bg-white p-3 text-black-500 placeholder:text-gray-500  focus:border-gray-500 focus:outline-none"  
                                >  
                                    <option value="">Please choose one option</option>  
                                    <option value="2">Class 2</option>   
                                    <option value="3">Class 3</option>   
                                    <option value="4">Class 4</option>   
                                    <option value="5">Class 5</option>   
                                    <option value="6">Class 6</option>   
                                    <option value="7">Class 7</option>   
                                    <option value="8">Class 8</option>   
                                    <option value="9">Class 9</option>   
                                    <option value="10">Class 10</option>   
                                    <option value="11">Class 11</option>  
                                    <option value="12">Class 12</option>  
                                </select>  
                            </div>  
                        </div>  

                        <div className="flex w-full mt-4">  
                            <button   
                                type="submit"  
                                disabled={loading}  
                                className="w-full bg-blue-800 hover:bg-blue-700 p-3 rounded-md text-center text-white font-bold transition-all duration-150 ease-in-out"  
                            >  
                                {loading ? <Spinner/> : "Search Admit Card"}  
                            </button>   
                        </div>  
                    </div>  
                </div>  
            </form> 
        </div>
    </div>  
  );
}