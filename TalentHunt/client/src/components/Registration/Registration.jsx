import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../context/userContext'
import regTypeStore from '../../store/regTypeStore';



export default function Registration() {


    const { medhaSelect, chitrangkanSelect } = regTypeStore();  

    const handleMedhaSelect = () => {  
        medhaSelect();  
    };  
    
    const handleChitrangkanSelect = () => {  
        chitrangkanSelect();  
    };
    
    return (
        <div className=" flex flex-col lg:flex lg:flex-row mt-6 lg:mt-10 lg:px-16 p-3 mx-auto w-full max-w-7xl lg:gap-8 ">
        <div className="mt-8 flex flex-col items-center justify-center gap-6 pb-4 shadow-lg">
            <div className="">
                <img src="https://res.cloudinary.com/salmanbd/image/upload/v1732279005/THC_2024_FB2_tkflsu.jpg" alt="image" />
            </div>
            <div>
            <Link
                to="registration-form"
                onClick={handleMedhaSelect}
                className="inline-flex text-white items-center px-6 py-3 font-medium bg-red-900 rounded-lg hover:opacity-75"
            >
                &nbsp; Registration Now
            </Link>
            </div>
        </div>

        {/* 
        <div className=" mt-8 flex flex-col items-center justify-center gap-6 pb-4 shadow-lg">
            <div className="">
                <img src="https://res.cloudinary.com/salmanbd/image/upload/v1732469626/DC_FB_24_2_rechwi.jpg" alt="image" />
            </div>
            <div>
            <Link
                to="registration-form"
                onClick={handleChitrangkanSelect}
                className="inline-flex text-white items-center px-6 py-3 font-medium bg-red-900 rounded-lg hover:opacity-75"
            >
                &nbsp; Registration Now
            </Link>
            </div>
        </div> 
        */}
    </div>
    )
}

