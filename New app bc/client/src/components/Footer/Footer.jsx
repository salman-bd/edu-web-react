import React from 'react'
import { Link } from 'react-router-dom';


export default function Footer() {
    return (
        <footer className="lg:mt-10 lg:px-12 py-3 mx-auto w-full max-w-7xl ">
            <div className='w-full text-3xl lg:text-lg flex flex-row justify-between overflow-auto gap-2 text-left '>
                <ul className="text-gray-500 font-medium flex flex-col gap-3 lg:flex lg:flex-row">
                    <li className="text-blue-800 hover:text-red-900 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 py-2 lg:p-2 mr-2">
                        <Link to="/" className="hover:underline">
                            Home
                        </Link>
                    </li>
                    <li className="text-blue-800 hover:text-red-900 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 py-2 lg:p-2 lg:py-2.5 mr-2">
                        <Link to="/about" className="hover:underline">
                            About
                        </Link>
                    </li>
                    <li className="text-blue-800 hover:text-red-900 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 py-2 lg:p-2 lg:py-2.5 mr-2">
                        <Link to="/contact" className="hover:underline">
                            Contact
                        </Link>
                    </li> 
                </ul>
                
                <ul className="text-gray-500 font-medium flex flex-col gap-3 lg:flex lg:flex-row">
                <li className="text-blue-800 hover:text-red-900 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 py-2 lg:p-2 lg:py-2.5 mr-2">
                        <Link to="/registration" className="hover:underline">
                            Registration
                        </Link>
                    </li>
                    <li className="text-blue-800 hover:text-red-900 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 py-2 lg:p-2 lg:py-2.5 mr-2">
                        <Link to="/admitcard" className="hover:underline">
                            Admit Card
                        </Link>
                    </li>

                    <li className="text-blue-800 hover:text-red-900 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 py-2 lg:p-2 lg:py-2.5 mr-2">
                        <Link to="/findyou" className="hover:underline">
                            Find You
                        </Link>
                    </li>  
                </ul>
                
                <ul className="flex flex-col items-center lg:flex-row">
                    <li  className="text-gray-600 focus:ring-gray-300 font-medium rounded-lg px-4 py-2 lg:p-2 lg:py-2.5 mr-2">
                        Follow us
                    </li>
                    <li  className="text-blue-800 hover:text-red-900 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 py-2 lg:p-2 lg:py-2.5 mr-2">
                        <a href="https://www.facebook.com/cscedubd/">Faceook</a>
                    </li>
                </ul>

            </div>

            <div className='flex flex-row justify-between'>
                <div className="text-3xl lg:text-lg font-medium text-left text-gray-700 hover:text-black px-4 py-2 lg:p-2 lg:py-2.5 mt-4">
                    <Link to="/privacy-policy" className="hover:underline ">
                        Privacy Policy
                    </Link>
                </div> 
                
                <div className="text-3xl lg:text-lg font-medium text-left text-gray-700 hover:text-black px-4 py-2 lg:p-2 lg:py-2.5 mt-4">
                    <Link to="/dashboard" className="hover:underline ">
                        Dashboard
                    </Link>
                </div> 
            </div>


            <div className='text-2xl lg:text-sm text-gray-600 flex flex-row justify-between  px-4 py-2 lg:p-2 lg:py-2.5 mt-4'>
            <p>
                &copy; Classic School And College
            </p>
            <p>
                Developed by: Md. Abu Salman
            </p>
            </div>
        </footer>
    );
}

