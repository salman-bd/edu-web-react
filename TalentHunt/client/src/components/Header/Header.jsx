import React, { useEffect, useState } from 'react';  
import axios from 'axios';  
import { Link, NavLink } from "react-router-dom";  
import { useUserContext } from '../../context/index.userContext';  
import useAuthStore from '../../store/authStore';  

export default function Header() {  
    const { setLoginText, setSignupText, loginText, signupText } = useUserContext();  
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);  
    const isSignedUp = useAuthStore((state) => state.isSignedUp);   
    const logout = useAuthStore((state) => state.logout);   

    // State for mobile menu  
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);  
    const [searchQuery, setSearchQuery] = useState("");  // State for search input  
    const [searchError, setSearchError] = useState(""); // State for search error message  

    // Update login and signup messages based on authentication state  
    useEffect(() => {  
        setLoginText(isAuthenticated ? "Logged In" : "Log In");  
        setSignupText(isAuthenticated ? "Signed Up" : "Sign Up");  
    }, [isAuthenticated, setLoginText, setSignupText]);  

    const handleSearch = (event) => {  
        event.preventDefault();  
        if (searchQuery.trim()) {  
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;  
            window.open(googleSearchUrl, '_blank'); // Opens the search in a new tab  
            setSearchError(""); // Clear any previous error  
        } else {  
            setSearchError("Please enter a search query."); // Set error message  
        }  
    };  

    const handleLogout = async () => {  
        try {  
            const apiUrl = import.meta.env.VITE_API_URL;  
            const response = await axios.post(`${apiUrl}/api/v1/users/logout`, { withCredentials: true });  
            console.log("Logout response from server: ", response);  
        } catch (error) {  
            console.log("Error: ", error);  
        } finally {  
            logout(); // Call the logout function from the store  
            setMobileMenuOpen(false); // Close the mobile menu  
        }  
    };      

    const renderNavLinks = () => (  
        ['/', '/about', '/contact', '/registration', '/admitcard'].map((path, index) => (  
            <li key={index}>  
                <NavLink  
                    to={path}  
                    onClick={() => setMobileMenuOpen(false)} // Close menu on click  
                    className={({ isActive }) =>  
                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-red-900" : "text-blue-700"} hover:text-red-900`  
                    }  
                >  
                    {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}  
                </NavLink>  
            </li>  
        ))  
    );  

    return (  
        <header className="shadow sticky z-50 top-0 w-full max-w-7xl">  
            <nav className="bg-white border-gray-800 px-3 lg:px-12 py-2">  
                {/* Search Bar Section for Desktop */}  
                <div className="hidden lg:flex pb-4 w-full">  
                    <form onSubmit={handleSearch} className="relative w-full max-w-lg m-auto">   
                        <input   
                            type="text"   
                            placeholder="Search in Google"   
                            value={searchQuery}  
                            onChange={(e) => setSearchQuery(e.target.value)}  
                            className="border rounded-lg p-1 px-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50"   
                        />  
                        <button type="submit" className="absolute right-1 top-1/2 transform -translate-y-1/2 px-2 flex items-center">  
                            <i className="fas fa-search text-gray-500 hover:text-blue-700"></i>  
                        </button>   
                    </form>    
                    {searchError && <p className="text-red-500">{searchError}</p>} {/* Display search error */}  
                </div>  

                {/* Logo and Mobile Search Section */}  
                <div className="flex items-center justify-between lg:hidden w-full">  
                    <Link to="/" className="flex items-center justify-center">  
                        <img  
                            src="https://res.cloudinary.com/salmanbd/image/upload/v1732878273/CSC-LOGO-BR_txhtvz.png"  
                            className="mr-3 h-20"  
                            alt="Logo"  
                        />  
                    </Link>  
                    
                    {/* Search Input for Mobile */}  
                    <form onSubmit={handleSearch} className="relative w-1/2 mx-2">   
                        <input   
                            type="text"   
                            placeholder="Search in Google"   
                            value={searchQuery}  
                            onChange={(e) => setSearchQuery(e.target.value)}  
                            className="border rounded-lg p-3 px-3 w-full text-4xl lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50"   
                        />  
                        <button type="submit" className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center text-4xl p-2">  
                            <i className="fas fa-search text-blue-500 hover:text-blue-700"></i>  
                        </button>   
                    </form>  

                    {/* Hamburger Menu Toggle */}  
                    <button  
                        aria-expanded={isMobileMenuOpen}  
                        aria-controls="mobile-menu"  
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}  
                        className="p-2 text-blue-700 focus:outline-none text-6xl"  
                    >  
                        <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>  
                    </button>  
                </div>  

                {/* Navigation Links Section for Desktop */}  
                <div className="hidden lg:flex lg:items-center lg:justify-between">  
                    <ul className="flex space-x-8">  
                        {renderNavLinks()}  
                    </ul>   

                    <div className="flex items-center gap-2 ml-4">  
                        {isAuthenticated ?   
                            (  
                                <>  
                                    <button className='text-blue-700'>  
                                        <i className="fas fa-user mr-2"></i>  
                                    </button>  
                                  
                                    <button   
                                        onClick={handleLogout}  
                                        className='border-2 border-blue-700 rounded-md py-1 px-3 hover:bg-blue-700 hover:text-white'>  
                                        Log out  
                                    </button>  
                                </>  
                            ) : (  
                                <>  
                                    <Link to="/login" className="text-blue-800 hover:text-red-900 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 py-2">  
                                        {loginText}  
                                    </Link>  
                                    {!isSignedUp && (  
                                        <Link to="/signup" className="text-white bg-red-900 hover:bg-red-900 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg px-4 py-2">  
                                            {signupText}  
                                        </Link>  
                                    )}  
                                </>  
                            )  
                        }  
                    </div>   
                </div>  

                {/* Mobile Navigation */}  
                {isMobileMenuOpen && (  
                    <div className="lg:hidden bg-white p-8 w-1/2 m-auto" id="mobile-menu">  
                        <ul className="flex flex-col items-center font-medium gap-2 text-3xl">  
                            {renderNavLinks()}  

                            {/* Add Log In, Log Out, and Sign Up options in Mobile Menu */}  
                            {isAuthenticated ? (  
                                <li className='flex items-center'>   
                                    <button className='text-blue-700'>  
                                        <i className="fas fa-user mr-2"></i>  
                                    </button>   
                                    <button  
                                        onClick={handleLogout}  
                                        className='text-blue-700 border-2 border-blue-600 rounded-md py-1 px-2 hover:bg-blue-700 hover:text-white ml-2'>  
                                        Log out  
                                    </button>  
                                </li>  
                            ) : (  
                                <>  
                                    <li>  
                                        <Link   
                                            to="/login"   
                                            onClick={() => setMobileMenuOpen(false)} // Close menu on click  
                                            className="text-blue-700 hover:text-red-900 hover:bg-gray-50 rounded-lg px-4 py-2">  
                                            {loginText}  
                                        </Link>  
                                    </li>  
                                    <li>  
                                        <Link   
                                            to="/signup"   
                                            onClick={() => setMobileMenuOpen(false)} // Close menu on click  
                                            className="text-blue-700 hover:text-red-900 hover:bg-gray-50 rounded-lg px-4 py-2">  
                                            {signupText}  
                                        </Link>  
                                    </li>  
                                </>  
                            )}  
                        </ul>  
                    </div>  
                )}  
            </nav>  
        </header>  
    );  
}