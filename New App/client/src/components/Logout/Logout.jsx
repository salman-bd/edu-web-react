import React from 'react';  
import axios from 'axios';  
import useAuthStore from '../../store/authStore';   

const Logout = () => {  
  const logout = useAuthStore((state) => state.logout);  

  const handleLogout = async () => {  
    try {  
      // Making sure to pass withCredentials in the request config  
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/api/v1/users/logout`);
      console.log("Logout response from server: ", response);  
      
    } catch (error) {  
      console.log("Error: ", error);  
    } finally {  
      logout(); // This is called regardless of success or failure  
    }  
  };  

};  

export default Logout;