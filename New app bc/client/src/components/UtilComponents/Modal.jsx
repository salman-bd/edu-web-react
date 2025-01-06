import React from 'react';  
 

const Modal = ({  isOpen,  onClose,  onCloseText,  successTitle,  failureTitle,  message,  redirect,  redirectBtnText,  redirectFunction, }) => {   

    return (  
        <div   
            role="dialog"   
            aria-modal="true"   
            className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${isOpen ? 'flex' : 'hidden'}`}>  
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">  
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">  
                    &times;  
                </button>  
                {successTitle && (  
                    <p className="text-lg font-bold underline text-green-800 mb-4">   
                        {successTitle}   
                    </p>  
                )}  
                {failureTitle && (  
                    <p className="text-lg font-bold underline text-red-600 mb-4">   
                        {failureTitle}   
                    </p>  
                )}  
                <p className="text-xl font-bold mb-4">{message}</p>   
                
                <div className='flex flex-col gap-4'>  
                    {redirect && (  
                        <button   
                            onClick={redirectFunction}   
                            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition">  
                            {redirectBtnText}  
                        </button>  
                    )}  
                    <button   
                        onClick={onClose}   
                        className="w-1/2 m-auto bg-red-700 text-white p-1 rounded hover:bg-red-600 transition">  
                        {onCloseText}   
                    </button>  
                </div>  
            </div>  
        </div>  
    );  
};  

export default Modal;



/*
import React from 'react';  
import regTypeStore from '../../store/regTypeStore';



const Modal = ({isOpen, onClose, onCloseText, successTitle, failureTitle, message, redirect, redirectBtnText, redirectFunction, specialText, constValue1, constValue2}) => { 

    if (!isOpen) return null;  

    // Access Zustand store directly inside the modal  
    const { isMedhaSelected, isChitrangkanSelected } = regTypeStore();  

    return (  
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${isOpen ? 'block' : 'hidden'}`}>  
        <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">  
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">  
            &times;  
        </button>
        {successTitle && (<p className="text-lg font-bold underline text-green-800 mb-4"> {successTitle} </p>)}
        {failureTitle && (<p className="text-lg font-bold underline text-red-600  mb-4"> {failureTitle} </p>)}
        <p className="text-xl font-bold mb-4">{message}</p> 
        
        
        <div className='flex flex-col gap-4'>
            {redirect &&
            <button   
                onClick={redirectFunction}   
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition">  
                {redirectBtnText}  
            </button>
            } 
            <button   
                onClick={onClose}   
                className="w-1/2 m-auto bg-red-700 text-white  p-1 rounded hover:bg-red-600 transition">  
                {onCloseText} 
            </button>
        </div>  
        </div>  
    </div>  
    );  
};  

export default Modal;

*/