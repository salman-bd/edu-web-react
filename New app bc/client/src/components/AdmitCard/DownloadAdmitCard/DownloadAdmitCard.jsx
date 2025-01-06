import React, { useEffect, useState } from 'react';  
import { useLocation } from 'react-router-dom';  
import axios from 'axios';  
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';  
import Spinner from '../../UtilComponents/Spinner';  
import './AdmitCard.css';  

const DownloadAdmitCard = () => {  
    const location = useLocation();  
    const registrationNumber = location.state?.registrationNumber;  
 
    const [applicantData, setApplicantData] = useState(null);  
    const [error, setError] = useState(null);  
    const [loading, setLoading] = useState(false);   

    useEffect(() => {  
        const fetchImage = async (url) => {  
            const response = await fetch(url);  
            const blob = await response.blob();  
            return URL.createObjectURL(blob);  
        };  

        const fetchData = async () => {  
            try {  
                const apiUrl = import.meta.env.VITE_API_URL;  
                const response = await axios.get(`${apiUrl}/api/v1/registration/admitcard/${registrationNumber}`);   
                const fetchedData = response.data.data;  

                // Fetch the image as a blob  
                fetchedData.photo = await fetchImage(fetchedData.photo);  
                
                setApplicantData(fetchedData);  
            } catch (error) {
                const errorMsg = error.response.message;
                if (errorMsg) {
                    setError(errorMsg);  
                } else {
                    setError('Failed to load the Admit Card. Please try again input correct registration number.');
                }
                   
            }  
        };  
        fetchData();  
    }, [registrationNumber]);  

    const downloadPDF = async () => {  
        setLoading(true);  
        const input = document.getElementById('admitCard');  

        // Ensure all images are loaded  
        const images = input.getElementsByTagName('img');  
        const imagePromises = Array.from(images).map(img => {  
            return new Promise((resolve) => {  
                if (img.complete) {  
                    resolve();  
                } else {  
                    img.onload = resolve;  
                }  
            });  
        });  

        await Promise.all(imagePromises);   

        const canvas = await html2canvas(input, { scale: 2 });  
        const imgData = canvas.toDataURL('image/png');  

        const pdf = new jsPDF('p', 'mm', 'a4');  
        const imgWidth = 210;   
        const imgHeight = (canvas.height * imgWidth) / canvas.width;  
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);  
        pdf.save('admit_card.pdf');  
        setLoading(false);  
    };  

    if (error) return <p className="text-4xl lg:text-lg text-center text-red-600 m-12">{error}</p>;   
    if (!applicantData) return <p className="text-center">Loading...</p>;  

    return (   
        <div className='flex flex-col items-center justify-center gap-2 mt-16 mx-auto w-full lg:w-3/4 lg:px-10'>  
            <div id="admitCard">  
                <div className="w-full m-auto p-4 flex-col items-center justify-center border-4 border-gray-200 rounded-md shadow-lg">  
                    <div className='flex flex-col gap-6'>
                        <div className='w-full m-auto flex flex-col gap-4'>  
                            <h2 className="text-4xl text-cyan-800 font-bold text-center">  
                                {applicantData.registrationHeadline}  
                            </h2>   
                            <h3 className="text-3xl text-teal-900 font-bold text-center">Admit Card</h3>   
                        </div>  

                        <div className="text-center flex flex-col gap-2 p-2">  
                            <div className="mx-auto">  
                                <img src={applicantData.photo} alt="Applicant" style={{ width: '300px', height: '300px' }} crossOrigin="anonymous" />  
                            </div>  
                            
                            <div className=' '>  
                                <p className="text-2xl "><strong>Name:</strong> {applicantData.fullName}</p>  
                            </div>  
                        </div>  
                    </div>

                    <hr className='border-2 border-cyan-800 mx-auto m-2'/>

                    <div className='flex flex-col gap-4'>
                        <div className="flex flex-col gap-2 text-left text-2xl">  
                            <p className="text-slate-900"><strong>Registration Number:</strong> {applicantData.registrationNumber}</p>    
                            <p className="text-slate-900"><strong>Institution Name:</strong> {applicantData.institutionName}</p>  

                            {applicantData.isMedhaSelected === 'true' && (  
                            <p className="text-slate-900"><strong>Medium:</strong> {applicantData.medium}</p>  
                            )}  

                            <p className="text-slate-900"><strong>Class:</strong> {applicantData.grade}</p>  
                            <p className="text-slate-900"><strong>Father&apos;s Name:</strong> {applicantData.fatherName}</p>  
                            <p className="text-slate-900"><strong>Mother&apos;s Name:</strong> {applicantData.motherName}</p>  

                            {applicantData.isChitrangkanSelected === 'true' && (  
                            <p className="text-slate-900"><strong>Contact No:</strong>{applicantData.contact}</p>  
                            )}  
                        </div>  

                        <div className='flex flex-col gap-2 text-left text-2xl'>  
                            <h4 className="text-cyan-900 font-bold">Exam Details:</h4>  
                            <p className="text-slate-900"><strong>Exam Venue:</strong> {applicantData.examVenue}</p>  
                            <p className="text-slate-900"><strong>Exam Date:</strong> {applicantData.examDate}</p>  
                            <p className="text-slate-900"><strong>Exam Time:</strong> {applicantData.examTime}</p>  
                        </div> 
                    </div>

                    <div className='text-slate-900 mt-10 flex flex-col items-center border border-gray-400 rounded-md p-4'>
                        <h1 className='text-3xl underline mb-4'>Orgainized by</h1>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-3xl font-bold'>Classic Foundation</h1>
                            <p className='text-2xl'>House-25, Road No-38, Block-C, Shahjalal Uposhahar, Sylhet.</p>
                        </div>
                    </div>

                </div>  
            </div>  
            <button onClick={downloadPDF} className="m-4 text-3xl lg:text-lg bg-blue-600 text-white font-semibold p-2 px-5 rounded hover:bg-blue-500">  
                {loading ? <Spinner /> : "Download Admit Card"}  
            </button>   
        </div>   
    );  
};  

export default DownloadAdmitCard;