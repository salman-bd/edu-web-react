import { create } from 'zustand';  

const useAuthStore = create((set) => {  
  // Initialize state from localStorage  
  const storedUser = localStorage.getItem('user');  
  const initialUser = storedUser ? JSON.parse(storedUser) : null;  

  return {  
    isAuthenticated: !!initialUser, // true if user exists  
    isSignedUp: !!initialUser, // Set based on whether user exists  
    user: initialUser,  
    isLoading: false, // Unified loading state  

    login: (userData) => {  
      set({ isLoading: true });  
      setTimeout(() => {  
        localStorage.setItem('user', JSON.stringify(userData));  
        set({ isAuthenticated: true, isSignedUp: true, user: userData, isLoading: false });  
      }, 1000);  
    },  

    signup: (userData) => {  
      set({ isLoading: true }); // Set loading state  
      setTimeout(() => {  
        localStorage.setItem('user', JSON.stringify(userData)); // Store under the same key  
        set({ isSignedUp: true, user: userData, isLoading: false }); // Update states  
      }, 1000);  
    },  

    logout: () => {  
      localStorage.removeItem('user');  
      set({ isAuthenticated: false, user: null, isSignedUp: false }); // Reset states on logout  
    },  
  };  
});  

export default useAuthStore;