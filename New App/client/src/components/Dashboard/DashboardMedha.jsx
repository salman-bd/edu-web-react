// src/DashboardChitrangkan.js  
import { useLocation } from 'react-router-dom'; // Make sure to import useLocation  
import './Dashboard.css'; // Import the custom CSS file  
import React, { useRef } from 'react';  


const DashboardMedha = () => {   
    const location = useLocation();  
    const applicantData = location.state?.data || [];   
    const printRef = useRef(); // Declare the useRef  

    const totalApplicant = applicantData.length;  

    // Separate entries by grade  
    const grade6Entries = applicantData.filter(entry => entry.grade === '6');  
    const grade7Entries = applicantData.filter(entry => entry.grade === '7');  
    const grade8Entries = applicantData.filter(entry => entry.grade === '8');  
    const grade9Entries = applicantData.filter(entry => entry.grade === '9');  
    const grade10Entries = applicantData.filter(entry => entry.grade === '10');  
    const grade11Entries = applicantData.filter(entry => entry.grade === '11');  
    const grade12Entries = applicantData.filter(entry => entry.grade === '12');  

    // Calculate totals for each grade  
    const totalGrade6 = grade6Entries.length;  
    const totalGrade7 = grade7Entries.length;  
    const totalGrade8 = grade8Entries.length;  
    const totalGrade9 = grade9Entries.length;  
    const totalGrade10 = grade10Entries.length;  
    const totalGrade11 = grade11Entries.length;  
    const totalGrade12 = grade12Entries.length;   

    // Count Bangla and English medium for each grade  
    const totalBanglaGrade6 = grade6Entries.filter(entry => entry.medium === 'bangla').length;  
    const totalEnglishGrade6 = grade6Entries.filter(entry => entry.medium === 'english').length;  
    
    const totalBanglaGrade7 = grade7Entries.filter(entry => entry.medium === 'bangla').length;  
    const totalEnglishGrade7 = grade7Entries.filter(entry => entry.medium === 'english').length;  

    const totalBanglaGrade8 = grade8Entries.filter(entry => entry.medium === 'bangla').length;  
    const totalEnglishGrade8 = grade8Entries.filter(entry => entry.medium === 'english').length;  

    const totalBanglaGrade9 = grade9Entries.filter(entry => entry.medium === 'bangla').length;  
    const totalEnglishGrade9 = grade9Entries.filter(entry => entry.medium === 'english').length;  

    const totalBanglaGrade10 = grade10Entries.filter(entry => entry.medium === 'bangla').length;  
    const totalEnglishGrade10 = grade10Entries.filter(entry => entry.medium === 'english').length;  

    const totalBanglaGrade11 = grade11Entries.filter(entry => entry.medium === 'bangla').length;  
    const totalEnglishGrade11 = grade11Entries.filter(entry => entry.medium === 'english').length;  

    const totalBanglaGrade12 = grade12Entries.filter(entry => entry.medium === 'bangla').length;  
    const totalEnglishGrade12 = grade12Entries.filter(entry => entry.medium === 'english').length;  

    const handlePrint = () => {  
        const printWindow = window.open('', '_blank');  
        printWindow.document.write(`  
            <html>  
                <head>  
                    <title></title>  
                    <style>  
                        body { font-family: Arial, sans-serif; margin: 20px; }  
                        h1 { text-align: center; }  
                        h2 { margin-top: 40px; }  
                        table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }  
                        th, td { border: 1px solid #000; padding: 8px; text-align: left; }  
                        th { background-color: #f2f2f2; }  
                    </style>  
                </head>  
                <body>  
                   
        `);  
    
        // Assuming you have an array of grades  
        const grades = [  
            { grade: '6', entries: grade6Entries },  
            { grade: '7', entries: grade7Entries },  
            { grade: '8', entries: grade8Entries },  
            { grade: '9', entries: grade9Entries },  
            { grade: '10', entries: grade10Entries },
            { grade: '11', entries: grade11Entries },  
            { grade: '12', entries: grade12Entries }  
        ];  
    
        // Loop through each grade and add a table for each  
        grades.forEach(({ grade, entries }) => {  
            printWindow.document.write(`  
                <h2>Class ${grade} Applicants</h2>  
                <table>  
                    <thead>  
                        <tr>  
                            <th>Name</th>  
                            <th>Institution Name</th>  
                            <th>Class</th>  
                            <th>Medium</th>  
                            <th>Registration Number</th>  
                        </tr>  
                    </thead>  
                    <tbody>  
                        ${entries.length > 0 ? entries.map(applicant => `  
                            <tr>  
                                <td>${applicant.fullName || ''}</td>  
                                <td>${applicant.institutionName || ''}</td>  
                                <td>${applicant.grade || ''}</td>  
                                <td>${applicant.medium || ''}</td>  
                                <td>${applicant.registrationNumber || ''}</td>  
                            </tr>  
                        `).join('') : `  
                            <tr>  
                                <td colspan="5" style="text-align: center;">No data available</td>  
                            </tr>  
                        `}  
                    </tbody>  
                </table>  
            `);  
        });  
    
        printWindow.document.write(`  
                </body>  
            </html>  
        `);  
        printWindow.document.close();  
        printWindow.print();  
    };

    return (  
        <div className='text-3xl lg:text-lg m-auto mt-10 p-6 w-full lg:px-10'>  
            <div className='text-left'>  
            <h1 className='text-4xl lg:text-3xl font-bold text-center mb-4'>Medha Onneshon Protijogita Applicants Summary</h1>
                <h1 className='font-bold py-4'> Total Applicants: {totalApplicant}</h1>  
                <div className='flex flex-col gap-4'> 
                    <div className='flex flex-col justify-start items-start gap-2 '>
                        <h1 className='font-bold'> Class Six: {totalGrade6}</h1>  
                        <h2>Bangla Medium: {totalBanglaGrade6.length}</h2>
                        <h2>English Medium: {totalEnglishGrade6.length}</h2>
                    </div> 
                    <div className='flex flex-col justify-start items-start gap-2 '>
                        <h1 className='font-bold'> Class Eight: {totalGrade8}</h1> 
                        <h2>Bangla Medium: {totalBanglaGrade7.length}</h2>
                        <h2>English Medium: {totalEnglishGrade7.length}</h2>
                    </div> 
                    <div className='flex flex-col justify-start items-start gap-2'>
                        <h1 className='font-bold'> Class Seven: {totalGrade7}</h1>     
                        <h2>Bangla Medium: {totalBanglaGrade8.length}</h2>
                        <h2>English Medium: {totalEnglishGrade8.length}</h2>
                    </div> 
                    <div className='flex flex-col justify-start items-start gap-2'>
                        <h1 className='font-bold'> Class Nine: {totalGrade9}</h1>    
                        <h2>Bangla Medium: {totalBanglaGrade9.length}</h2>
                        <h2>English Medium: {totalEnglishGrade9.length}</h2>
                    </div> 
                    <div className='flex flex-col justify-start items-start gap-2'>
                        <h1 className='font-bold'> Class Ten: {totalGrade10}</h1>  
                        <h2>Bangla Medium: {totalBanglaGrade10.length}</h2>
                        <h2>English Medium: {totalEnglishGrade10.length}</h2>
                    </div> 
                    <div className='flex flex-col justify-start items-start gap-2'>
                        <h1 className='font-bold'> Class Eleven: {totalGrade11}</h1>   
                        <h2>Bangla Medium: {totalBanglaGrade11.length}</h2>
                        <h2>English Medium: {totalEnglishGrade11.length}</h2>
                    </div> 
                    <div className='flex flex-col justify-start items-start gap-2 '>
                        <h1 className='font-bold'> Class Twelve: {totalGrade12}</h1>  
                        <h2>Bangla Medium: {totalBanglaGrade12.length}</h2>
                        <h2>English Medium: {totalEnglishGrade12.length}</h2>
                    </div>                     
                     
                      
                </div>  
            </div>  
            
            
            <div ref={printRef} className="dashboard-content"> {/* Wrap everything to be captured */}  
                <button   
                    onClick={handlePrint}  
                    className='bg-blue-500 text-white p-1 px-3 mt-8  rounded-md'>Print the tables  
                </button>  

                {/* Grade 6 Table */}  
                <h1 className='text-1xl font-bold p-2 mt-2'>Class Six Applicants</h1>  
                <table className="data-table">  
                    <thead>  
                        <tr>  
                            <th>Name</th>  
                            <th>Institution Name</th>  
                            <th>Class</th>  
                            <th>Medium</th>  
                            <th>Registration Number</th>  
                        </tr>  
                    </thead>  
                    <tbody>  
                        {grade6Entries.length > 0 ? (  
                            grade6Entries.map((applicant, index) => (  
                                <tr key={index}>  
                                    <td>{applicant.fullName}</td>  
                                    <td>{applicant.institutionName}</td>  
                                    <td>{applicant.grade}</td>  
                                    <td>{applicant.medium}</td>  
                                    <td>{applicant.registrationNumber}</td>  
                                </tr>  
                            ))  
                        ) : (  
                            <tr>  
                                <td colSpan="5" style={{ textAlign: 'center' }}>No data available</td>  
                            </tr>  
                        )}  
                    </tbody>  
                </table>  

                {/* Grade 7 Table */}  
                <h1 className='text-1xl font-bold p-2 mt-10'>Class Seven Applicants</h1> 
    
                <table className="data-table">  
                    <thead>  
                        <tr>  
                            <th>Name</th>  
                            <th>Institution Name</th>  
                            <th>Class</th>  
                            <th>Medium</th>  
                            <th>Registration Number</th>  
                        </tr>  
                    </thead>  
                    <tbody>  
                        {grade7Entries.length > 0 ? (  
                            grade7Entries.map((applicant, index) => (  
                                <tr key={index}>  
                                    <td>{applicant.fullName}</td>  
                                    <td>{applicant.institutionName}</td>  
                                    <td>{applicant.grade}</td>  
                                    <td>{applicant.medium}</td>  
                                    <td>{applicant.registrationNumber}</td>  
                                </tr>  
                            ))  
                        ) : (  
                            <tr>  
                                <td colSpan="4" style={{ textAlign: 'center' }}>No data available</td>  
                            </tr>  
                        )}  
                    </tbody>  
                </table>  
                    
                {/* Grade 8 Table */}  
                <h1 className='text-1xl font-bold p-2 mt-10'>Class Eight Applicants</h1>  
                <table className="data-table">  
                    <thead>  
                        <tr>  
                            <th>Name</th>  
                            <th>Institution Name</th>  
                            <th>Class</th>  
                            <th>Medium</th>  
                            <th>Registration Number</th>  
                        </tr>  
                    </thead>  
                    <tbody>  
                        {grade8Entries.length > 0 ? (  
                            grade8Entries.map((applicant, index) => (  
                                <tr key={index}>  
                                    <td>{applicant.fullName}</td>  
                                    <td>{applicant.institutionName}</td>  
                                    <td>{applicant.grade}</td>  
                                    <td>{applicant.medium}</td>  
                                    <td>{applicant.registrationNumber}</td>  
                                </tr>  
                            ))  
                        ) : (  
                            <tr>  
                                <td colSpan="4" style={{ textAlign: 'center' }}>No data available</td>  
                            </tr>  
                        )}  
                    </tbody>  
                </table>  

                {/* Grade 9 Table */}  
                <h1 className='text-1xl font-bold p-2 mt-10'>Class Nine Applicants</h1>  
                <table className="data-table">  
                    <thead>  
                        <tr>  
                            <th>Name</th>  
                            <th>Institution Name</th>  
                            <th>Class</th>  
                            <th>Medium</th>  
                            <th>Registration Number</th>  
                        </tr>  
                    </thead>  
                    <tbody>  
                        {grade9Entries.length > 0 ? (  
                            grade9Entries.map((applicant, index) => (  
                                <tr key={index}>  
                                    <td>{applicant.fullName}</td>  
                                    <td>{applicant.institutionName}</td>  
                                    <td>{applicant.grade}</td>  
                                    <td>{applicant.medium}</td>  
                                    <td>{applicant.registrationNumber}</td>  
                                </tr>  
                            ))  
                        ) : (  
                            <tr>  
                                <td colSpan="4" style={{ textAlign: 'center' }}>No data available</td>  
                            </tr>  
                        )}  
                    </tbody>  
                </table>  
                {/* Grade 10 Table */}  
                <h1 className='text-1xl font-bold p-2 mt-10'>Class Ten Applicants</h1>  
                <table className="data-table">  
                    <thead>  
                        <tr>  
                            <th>Name</th>  
                            <th>Institution Name</th>  
                            <th>Class</th>  
                            <th>Medium</th>  
                            <th>Registration Number</th>  
                        </tr>  
                    </thead>  
                    <tbody>  
                        {grade10Entries.length > 0 ? (  
                            grade10Entries.map((applicant, index) => (  
                                <tr key={index}>  
                                    <td>{applicant.fullName}</td>  
                                    <td>{applicant.institutionName}</td>  
                                    <td>{applicant.grade}</td>  
                                    <td>{applicant.medium}</td>  
                                    <td>{applicant.registrationNumber}</td>  
                                </tr>  
                            ))  
                        ) : (  
                            <tr>  
                                <td colSpan="4" style={{ textAlign: 'center' }}>No data available</td>  
                            </tr>  
                        )}  
                    </tbody>  
                </table>  
                {/* Grade 11 Table */}  
                <h1 className='text-1xl font-bold p-2 mt-10'>Class Eleven Applicants</h1>  
                <table className="data-table">  
                    <thead>  
                        <tr>  
                            <th>Name</th>  
                            <th>Institution Name</th>  
                            <th>Class</th> 
                            <th>Medium</th>   
                            <th>Registration Number</th>  
                        </tr>  
                    </thead>  
                    <tbody>  
                        {grade11Entries.length > 0 ? (  
                            grade11Entries.map((applicant, index) => (  
                                <tr key={index}>  
                                    <td>{applicant.fullName}</td>  
                                    <td>{applicant.institutionName}</td>  
                                    <td>{applicant.grade}</td>  
                                    <td>{applicant.medium}</td>  
                                    <td>{applicant.registrationNumber}</td>  
                                </tr>  
                            ))  
                        ) : (  
                            <tr>  
                                <td colSpan="4" style={{ textAlign: 'center' }}>No data available</td>  
                            </tr>  
                        )}  
                    </tbody>  
                </table>  
                {/* Grade 12 Table */}  
                <h1 className='text-1xl font-bold p-2 mt-10'>Class Twelve Applicants</h1>  
                <table className="data-table">  
                    <thead>  
                        <tr>  
                            <th>Name</th>  
                            <th>Institution Name</th>  
                            <th>Class</th>  
                            <th>Medium</th>  
                            <th>Registration Number</th>  
                        </tr>  
                    </thead>  
                    <tbody>  
                        {grade12Entries.length > 0 ? (  
                            grade12Entries.map((applicant, index) => (  
                                <tr key={index}>  
                                    <td>{applicant.fullName}</td>  
                                    <td>{applicant.institutionName}</td>  
                                    <td>{applicant.grade}</td>  
                                    <td>{applicant.medium}</td>  
                                    <td>{applicant.registrationNumber}</td>  
                                </tr>  
                            ))  
                        ) : (  
                            <tr>  
                                <td colSpan="4" style={{ textAlign: 'center' }}>No data available</td>  
                            </tr>  
                        )}  
                    </tbody>  
                </table>  
            </div>  

        </div>  
    );  
};  

export default DashboardMedha;