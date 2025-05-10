import { create } from 'zustand';  

console.log(localStorage.getItem('regType'));

const regTypeStore = create((set) => {  
  // Initialize state from localStorage  
  const storedRegType = localStorage.getItem('regType');  
  const initialRegType = storedRegType ? JSON.parse(storedRegType) : { isRegTypeSelected: false, isMedhaSelected: false, isChitrangkanSelected: false };  

  return {  
    ...initialRegType,  
    
    medhaSelect: () => {  
      const newState = {  
        isRegTypeSelected: true,  
        isMedhaSelected: true,  
        isChitrangkanSelected: false,
        registrationHeadline: "Medha Onneshon Protijogita - 2024"
      };  
      localStorage.setItem('regType', JSON.stringify(newState)); // Persist selection  
      set(newState); // Update Zustand state  
    },  

    chitrangkanSelect: () => {  
      const newState = {  
        isRegTypeSelected: true,  
        isChitrangkanSelected: true,  
        isMedhaSelected: false, 
        registrationHeadline: "Chitrangkan Protijogita - 2024" 
      };  
      localStorage.setItem('regType', JSON.stringify(newState)); // Persist selection  
      set(newState); // Update Zustand state  
    },  

    removeRegType: () => {  
      localStorage.removeItem('regType'); // Clear from localStorage  
      set({  
        isRegTypeSelected: false,  
        isMedhaSelected: false,  
        isChitrangkanSelected: false,  
      }); // Reset state  
    },  
  };  
});  

export default regTypeStore;