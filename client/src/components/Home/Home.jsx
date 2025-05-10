import React from "react";
import { Link } from "react-router-dom";
import regTypeStore from "../../store/regTypeStore";

export default function Home() {

  
    const { medhaSelect, chitrangkanSelect } = regTypeStore();  

    const handleMedhaSelect = () => {  
        medhaSelect();  
    };  
    
    const handleChitrangkanSelect = () => {  
        chitrangkanSelect();  
    };


    return (
        <div className="mt-6 lg:mt-10 lg:px-16 p-3 mx-auto w-full max-w-7xl">
            <div className="flex flex-col gap-8">

                <div className="m-auto flex flex-col items-center justify-center mb-12">
                    <h2 className="text-4xl text-red-800 font-bold sm:text-5xl">
                    Welcome to ...
                    </h2>
                    <h2 className="text-blue-800 font-bold sm:text-5xl">
                        Classic School And College
                    </h2>
                </div>

                <div className="flex flex-col lg:flex gap-8 items-center justify-center  lg:flex-row shadow-lg ">
                    <div className="w-full">
                        <p className="lg:text-2xl sm:text-2xl text-justify">
                        At Classic School, we take pride in our diverse and dynamic student body, spanning from our youngest learners in Nursery to our accomplished scholars in Class Ten. Our nurturing environment supports their growth, fostering a love for learning and a sense of community that lasts a lifetime.
                        </p>
                    </div>

                    <div className="w-full">
                        <img src="https://res.cloudinary.com/salmanbd/image/upload/fwacaw5dlkzaq11kzo9l.jpg" alt="Photo" />
                    </div>
                </div>

            </div>
            
            <div className="flex flex-col lg:flex lg:flex-row lg:gap-8">
                <div className="mt-16 flex flex-col items-center justify-center gap-6 pb-4 shadow-lg">
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

                <div className="mt-16 flex flex-col items-center justify-center gap-6 pb-4 shadow-lg">
                    <div className="">
                        <img src="https://res.cloudinary.com/salmanbd/image/upload/v1732469626/DC_FB_24_2_rechwi.jpg" alt="image" />
                    </div>
                    <div>
                    <Link
                        className="cursor-not-allowed inline-flex text-white items-center px-6 py-3 font-medium bg-red-900 rounded-lg hover:opacity-75"
                    >
                        &nbsp; Registration Now
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
