import React from 'react'
import { Link } from 'react-router-dom';


export default function Footer() {
    return (
        <footer className="lg:mt-10 lg:px-16 p-3 mx-auto w-full max-w-7xl">

            <div className="flex flex-row justify-between">
                <div className='flex flex-col gap-2 text-left lg:flex lg:flex-row  lg:items-center lg:gap-4 lg'>

                    <ul className="text-gray-500 font-medium flex flex-col gap-1 lg:flex lg:flex-row">
                        <li className="text-blue-800 hover:text-red-900 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
                            <Link to="/" className="hover:underline">
                                Home
                            </Link>
                        </li>
                        <li className="text-blue-800 hover:text-red-900 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
                            <Link to="/about" className="hover:underline">
                                About
                            </Link>
                        </li>
                        <li className="text-blue-800 hover:text-red-900 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
                            <Link to="/contact" className="hover:underline">
                                Contact
                            </Link>
                        </li>
                        <li className="text-blue-800 hover:text-red-900 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
                            <Link to="/registration" className="hover:underline">
                                Registration
                            </Link>
                        </li>
                        <li className="text-blue-800 hover:text-red-900 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
                            <Link to="/admitcard" className="hover:underline">
                                Admit Card
                            </Link>
                        </li>

                        <li className="text-blue-800 hover:text-red-900 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
                            <Link to="/signup" className="hover:underline">
                                Sign Up
                            </Link>
                        </li>
                        
                    </ul>
                </div>

                <div className='flex flex-col gap-2 lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-4'>
                    <div>
                        <h2 className="text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
                    </div>
                    <div>
                        <ul className="mt-0 text-gray-500 font-medium">
                            <li  className="text-blue-800 hover:text-red-900 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
                                <a href="https://www.facebook.com/cscedubd/">Faceook</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

