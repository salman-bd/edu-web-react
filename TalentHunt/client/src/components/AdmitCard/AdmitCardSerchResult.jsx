import React, { useEffect, useState } from 'react';  
import { useLocation, useNavigate } from 'react-router-dom';  
import Spinner from '../UtilComponents/Spinner';  

const AdmitCardSearchResult = () => {  
    const navigate = useNavigate();  
    const location = useLocation();  
    const applicantData = location.state?.specialData;  

    const [loading, setLoading] = useState(false);  

    const downloadAdmitCard = (registrationNumber) => {  
        if (registrationNumber) {  
            navigate("download-admitcard", { state: { registrationNumber } });  
        }  
    };  

    return (  
        <div className='mt-6 lg:mt-16 lg:px-16 p-3 mx-auto w-full max-w-7xl'>  
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>  
                {applicantData && applicantData.length > 0 ? (  
                    applicantData.map((applicant, index) => (  
                        <div key={index} className="bg-white shadow-md border border-slate-200 rounded-lg w-full p-6">  
                            <div className="flex flex-col items-center justify-center gap-2">  
                                <div className='flex items-center'>  
                                    <img src={applicant.photo} alt="Applicant" className="w-full h-full object-cover" />  
                                </div>  
                                <h4 className="text-xl font-semibold text-slate-900 rounded-md">  
                                    {applicant.fullName}  
                                </h4>  
                            </div>  
                            <div className="flex flex-col text-left gap-1 pt-4 pb-4 bg-white shadow-sm w-full">  
                                <p className="text-slate-900"><strong>Registration Number:</strong> {applicant.registrationNumber}</p>  
                                <p className="text-slate-900"><strong>Institution Name:</strong> {applicant.institutionName}</p>  
                                
                                {applicant.isMedhaSelected === 'true' && (  
                                    <p className="text-slate-900"><strong>Medium:</strong> {applicant.medium}</p>  
                                )}  
                                
                                <p className="text-slate-900"><strong>Class:</strong> {applicant.grade}</p>  
                                <p className="text-slate-900"><strong>Father's Name:</strong> {applicant.fatherName}</p>  
                                <p className="text-slate-900"><strong>Mother's Name:</strong> {applicant.motherName}</p>  
                            </div>  
                            <button  
                                onClick={() => downloadAdmitCard(applicant.registrationNumber)}  
                                className="min-w-32 rounded-md bg-blue-700 py-2 px-4 border border-transparent text-center text-3xl lg:text-lg text-white transition-all shadow-md hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-600"  
                                disabled={loading}   
                                type="button"  
                            >  
                                {loading ? <Spinner /> : "Download Admit Card"}  
                            </button>  
                        </div>  
                    ))  
                ) : (  
                    <p className="text-gray-500">No applicant data found.</p>  
                )}  
            </div>  
        </div>  
    );  
};  

export default AdmitCardSearchResult;