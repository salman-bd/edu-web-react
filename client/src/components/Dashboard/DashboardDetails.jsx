// src/components/Dashboard.js  
import React, { useState } from 'react';  
import axios from 'axios';  
import Spinner from '../UtilComponents/Spinner';  
import { useNavigate } from 'react-router-dom';  

const DashboardDetails = () => {  
    const apiUrl = import.meta.env.VITE_API_URL; // Make sure your environment variable is set  
    const navigate = useNavigate();  
    const [loading, setLoading] = useState(false);   
    const [data, setData] = useState([]); // Initialize as an empty array to avoid any issues  

    const handleChitrangkanDashboard = async (event) => {  
        event.preventDefault();   
        setLoading(true); // Set loading to true on submit  

        try {  
            // Assuming you might need some data for your POST request  
            const response = await axios.post(`${apiUrl}/api/v1/registration/dashboard/chitrangkan`, {  
                // Replace with actual data needed for the request  
            });
            // console.log("Login Response: ", response.data.data);
            const data = response.data.data;
            setData(data); // Store the fetched data  
            
            if (data) {  
                navigate('dashboard-chitrangkan', { state: { data: data } }) // Pass data to the next page  
            }  

        } catch (error) {  
            console.error("Error in Chitrangkan dashboard", error);  
            // Optionally, provide user feedback using a modal or alert  
            alert("An error occurred while fetching the data.");  
        } finally {  
            setLoading(false);  
        }  
    };   

    const handleMedhaDashboard = async (event) => {  
        event.preventDefault();   
        setLoading(true); // Set loading to true on submit  

        try {  
            // Assuming you might need some data for your POST request  
            const response = await axios.post(`${apiUrl}/api/v1/registration/dashboard/medhaonneshon`, {  
                // Replace with actual data needed for the request  
            });
            // console.log("Login Response: ", response.data.data);
            const data = response.data.data;
            setData(data); // Store the fetched data  
            
            if (data) {  
                navigate('dashboard-medha', { state: { data: data } }) // Pass data to the next page  
            }  

        } catch (error) {  
            console.error("Error in Chitrangkan dashboard", error);  
            // Optionally, provide user feedback using a modal or alert  
            alert("An error occurred while fetching the data.");  
        } finally {  
            setLoading(false);  
        }  
    };   
    
    return (  
        <div className="flex flex-col items-center justify-center m-12 py-16 bg-white   max-w-7xl">  
            {/* Main Content */}  
            <div className="flex-1 p-4">  
                <h2 className="text-5xl lg:text-3xl font-semibold text-center">Welcome to Our Dashboard</h2>  
                <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-4">  
                    <div className="bg-white p-4 shadow rounded">  
                        <h3 className="text-4xl lg:text-2xl font-bold mb-3">Dashboard 1</h3>  
                        <button  
                            onClick={handleMedhaDashboard}  
                            className="text-3xl lg:text-lg w-full bg-blue-800 hover:bg-blue-700 p-3 rounded-md text-center text-white transition-all duration-150 ease-in-out"  
                        >  
                            {loading ? <Spinner/> : "Details About Medha Onneshon Protijogita"}  
                        </button>   
                    </div>  

                    <div className="bg-white p-4 shadow rounded">  
                        <h3 className="text-4xl lg:text-2xl font-bold mb-3">Dashboard 2</h3>  
                        <button  
                            onClick={handleChitrangkanDashboard}  
                            className="text-3xl lg:text-lg w-full bg-blue-800 hover:bg-blue-700 p-3 rounded-md text-center text-white transition-all duration-150 ease-in-out"  
                        >  
                            {loading ? <Spinner/> : "Details About Chitrangkan Protijogita"}  
                        </button>  
                    </div>   
                </div>  
            </div>  
        </div>  
    );  
};  

export default DashboardDetails;