import React, { useEffect, useState } from "react";  
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import useAuthStore from "../../store/authStore";
import regTypeStore from "../../store/regTypeStore";
import Modal from "../UtilComponents/Modal";
import Spinner from "../UtilComponents/Spinner";


export default function RegistraitonForm() {

    const [loading, setLoading] = useState(false); 
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const navigate = useNavigate();
    

    const { isRegTypeSelected, isMedhaSelected, isChitrangkanSelected, registrationHeadline,  } = regTypeStore();

    console.log("isRegTypeSelected, isMedhaSelected, isChitrangkanSelected staus: ", isRegTypeSelected, isMedhaSelected, isChitrangkanSelected);
    


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

    // const { regFormHeadline, setRegFormHeadline, regFormHeadline } = useUserContext();

    
    const [formData, setFormData] = useState({  
        fullName: "",  
        institutionName: "",  
        contact: "+88",  
        medium: "",  
        grade: "",  
        fatherName: "",  
        motherName: "",  
        photo: null,
        isMedhaSelected, 
        isChitrangkanSelected,
        registrationHeadline,
    });

    let registrationNumber;
    
    const handleChange = (event) => {  
        const { name, type, value, files } = event.target;  

        if (type === "file") {  
            setFormData({ ...formData, [name]: files[0] }); // Save the file object  
        } else {  
            setFormData({ ...formData, [name]: value });  
        }  
    };  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        const data = new FormData();  

        // Append the form data to FormData object  
        for (const key in formData) {  
            data.append(key, formData[key]);  
        }

        // if (!isAuthenticated) {  
        //     setModalMessage("Please log in first before completing registration.");  
        //     setFailureTitle("Access Denied");  
        //     setIsModalOpen(true); 
        //     setOnCloseText("Cancel");
        //     setRedirect(true);
        //     setRedirectBtnText("Log In");
        //     setRedirectFunction(() => directLogInPage); 
        //     return;  
        // } 
        setLoading(true);

        try {         
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${apiUrl}/api/v1/registration`, data);
            // console.log("Resolve Response: ", response);  
            registrationNumber = response.data.data.registrationNumber;
            setSuccessTitle("Registration Successful");
            setModalMessage(`Your Registration Number is: ${registrationNumber}. Please store it for further use.`);
            setIsModalOpen(true); 
            setOnCloseText("Cancel");
            setRedirect(true);
            setRedirectBtnText("Download Admit Card");
            setRedirectFunction(() => downloadAdmitCard);
            setFailureTitle(""); 
        
        } catch (error) {  
            console.log("Error Response when user try to registration: ", error.response);   
            const errorMsg = error.response?.data?.message || "Network error: Unable to connect to server."; 
            if (errorMsg === "duplicateApplicant") {
                setFailureTitle("Duplicate Application");
                setModalMessage("You already applied with similar information. You should download the Admit Card");
                setIsModalOpen(true);
                setOnCloseText("Cancel");
                setRedirect(true);
                setRedirectBtnText("Download Admit Card");
                setRedirectFunction(() => directAdmitCardPage);
                setSuccessTitle("")
            } else {  
                setModalMessage(errorMsg);  
                setFailureTitle("Error");  
                setIsModalOpen(true)
                setOnCloseText("OK");
                setSuccessTitle("")
            }
        } finally {  
            setLoading(false); 
        }  
    };

    const handleReset = () => {  
        setFormData({  
            fullName: "",  
            institutionName: "",  
            contact: "+88",  
            medium: "",  
            grade: "",  
            fatherName: "",  
            motherName: "",  
            photo: null,
        });   
    };

    const directAdmitCardPage = () => {
        navigate("/admitcard")
    }
    // const directLogInPage = () => {
    //     navigate("/login")
    // }

    const downloadAdmitCard = () => {
        if (registrationNumber) {
            navigate("/download-admitcard", { state: { registrationNumber } }); 
        }
    }

    return (
        
        <div className="m-auto mt-10  w-full max-w-7xl">

            <div>
                {/* Modal Component */}  
                {isModalOpen && <Modal   
                    isOpen={isModalOpen}   
                    onClose={closeModal}   
                    onCloseText={onCloseText}   
                    successTitle={successTitle}
                    failureTitle={failureTitle}
                    message={modalMessage}
                    redirect={redirect}
                    redirectBtnText={redirectBtnText}
                    redirectFunction={redirectFunction}
                    onConfirm={closeModal}  // Close the modal on confirm  
                />
                }
            </div>

            
            <div>
                <h1 className="text-2xl text-indigo-800 lg:text-3xl font-bold">
                    {registrationHeadline}
                </h1>
            </div>
            
            {(isRegTypeSelected || isMedhaSelected || isChitrangkanSelected) && (
            <div className="w-full lg:w-1/2  border-solid border-2 border-gray-200 rounded-md m-auto flex flex-col items-center justify-center shadow-md mt-5">
                <div className="pt-4">
                    <h1 className="mb-2 text-2xl lg:text-3xl font-bold text-blue-800">
                    Complete registration
                    </h1>
                    <p className="text-sm text-red-900 font-semibold pb-2">
                    All information should be provided in English
                    </p>
                </div>

                <fieldset className="text-left w-full">
                    <form className="mt-5 mx-4 flex flex-col items-start justify-start gap-4" onSubmit={handleSubmit}>
                        <div className="flex w-full flex-col gap-2">
                            <label htmlFor="fullName">Full Name*</label>
                            <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter Your Full Name"
                            required
                            className="w-full border-[1px] rounded-md border-gray-300 bg-white p-2 text-sm text-black-500 placeholder:text-gray-400 shadow-sm  focus:border-red-900 focus:outline-none"
                            />
                        </div>

                        <div className="flex w-full flex-col items-start justify-start gap-2">
                            <label htmlFor="institutionName">Institution name* </label>
                            <input
                            type="text"
                            name="institutionName"
                            id="institutionName"
                            value={formData.institutionName}
                            onChange={handleChange}
                            placeholder="Enter Your Institution Name"
                            required
                            className="w-full border-[1px] rounded-md border-gray-300 bg-white p-2 text-sm text-black-500 placeholder:text-gray-400 shadow-sm focus:border-red-900 focus:outline-none"
                            />
                        </div>

                        <div className="flex w-full flex-col items-start justify-start gap-2">
                            <label htmlFor="tel">Contact*</label>
                            <input
                            type="tel"
                            name="contact"
                            id="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            
                            placeholder="Enter Mobile number"
                            required
                            className="w-full border-[1px] rounded-md border-gray-300 bg-white p-2 text-sm text-black-500 placeholder:text-gray-400 shadow-sm focus:border-red-900 focus:outline-none"
                            />
                        </div>

                        {isMedhaSelected &&
                        <div className="items-center gap-1 w-full">
                            <label htmlFor="medium">Medium*</label>
                            <div className="flex gap-2 border-[1px] rounded-md border-gray-300 bg-white p-2 text-sm text-black-500 placeholder:text-gray-400 shadow-sm">
                                <input
                                type="radio"
                                name="medium"
                                value="bangla"
                                id="bangla"
                                checked={formData.medium === "bangla"}
                                onChange={handleChange}
                                />
                                Bangla

                                <input
                                type="radio"
                                name="medium"
                                value="english"
                                id="english"
                                checked={formData.medium === "english"}
                                onChange={handleChange}
                                />
                                English
                            </div>
                        </div>
                        }

                        {isChitrangkanSelected &&
                        <div className="flex w-full flex-col items-start justify-start gap-2">
                            <label htmlFor="grade">Select Your Class*</label>
                            <div className="w-full ">
                                <select
                                    name="grade"
                                    id="grade"
                                    value={formData.grade}
                                    onChange={handleChange}
                                    className="w-full border-[1px] rounded-md border-gray-300 bg-white p-2 text-sm text-black-500 placeholder:text-gray-400 shadow-sm"
                                    >
                                    <option
                                        value=""
                                        defaultValue={formData.graderade === ""}
                                    >
                                    Please choose one option
                                    </option>
                                    <option value="2">Class 2</option> 
                                    <option value="3">Class 3</option> 
                                    <option value="4">Class 4</option> 
                                    <option value="5">Class 5</option> 
                                </select>
                            </div>
                        </div>
                        }

                        {isMedhaSelected &&
                        <div className="flex w-full flex-col items-start justify-start gap-2">
                            <label htmlFor="grade">Select Your Class*</label>
                            <div className="w-full ">
                                <select
                                    name="grade"
                                    id="grade"
                                    value={formData.grade}
                                    onChange={handleChange}
                                    className="w-full border-[1px] rounded-md border-gray-300 bg-white p-2 text-sm text-black-500 placeholder:text-gray-400 shadow-sm"
                                    >
                                    <option
                                        value=""
                                        defaultValue={formData.grade === ""}
                                    >
                                    Please choose one option
                                    </option>
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
                        }


                        <div className="flex w-full flex-col items-start justify-start gap-2">
                        <label htmlFor="fatherName">Father's Name*</label>
                            <input
                                type="text"
                                name="fatherName"
                                id="fatherName"
                                value={formData.fatherName}
                                onChange={handleChange}
                                placeholder="Enter Your Father's Name"
                                required
                                className="w-full border-[1px] rounded-md border-gray-300 bg-white p-2 text-sm text-black-500 placeholder:text-gray-400 shadow-sm focus:border-red-900 focus:outline-none"
                            />
                        </div>

                        <div className="flex w-full flex-col items-start justify-start gap-2">
                            <label htmlFor="motherName">Mother's Name*</label>
                            <input
                                type="text"
                                name="motherName"
                                id="motherName"
                                value={formData.motherName}
                                onChange={handleChange}
                                placeholder="Enter Your Mother's Name"
                                required
                                className="w-full border-[1px] rounded-md border-gray-300 bg-white p-2 text-sm text-black-500 placeholder:text-gray-400 shadow-sm focus:border-red-900 focus:outline-none"
                            />
                        </div>

                        <div className="flex w-full flex-col items-start justify-start gap-2">
                            <label htmlFor="photo">Upload one of your recent photos*</label>
                            <input
                                type="file"
                                accept="image/*"
                                name="photo"
                                id="photo"
                                onChange={handleChange}
                                placeholder="Upload a Photo File"
                                required
                                className="w-full border-[1px] rounded-md border-gray-300 bg-white p-2 text-sm text-black-500 placeholder:text-gray-400 shadow-sm focus:border-red-900 focus:outline-none"
                            />
                        </div>
                        
                        <div className="flex w-full items-center justify-between gap-6">
                            <button
                                type="reset"
                                value="reset"
                                onClick={() => handleReset()}
                                className="w-full bg-blue-800 blue-500 hover:bg-blue-700 mt-5 p-3 rounded-md text-center text-white font-bold  transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                disabled={loading} // Disable button while loading
                                className="w-full bg-blue-800 blue-500 hover:bg-blue-700 mt-5 p-3 rounded-md text-center text-white font-bold  transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                            >
                                {loading ? <Spinner /> : "Registration Now"} 
                            </button>
                        </div>
                    </form>

                    <div className="text-center w-full">
                        <p className="my-8 text-sm font-light text-black">
                        Already registered?{" "}
                        <button
                        onClick={directAdmitCardPage}
                        className="cursor-pointer font-bold hover:underline"
                        >
                            Download Your Admit Card
                        </button>
                        </p>
                    </div>
                </fieldset>
            </div>
            )}
        </div>
        
    );
};
