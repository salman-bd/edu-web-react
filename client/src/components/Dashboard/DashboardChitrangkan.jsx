// src/DashboardChitrangkan.js  
import React from 'react';  
import { useLocation } from 'react-router-dom'; // Make sure to import useLocation  
import './Dashboard.css'; // Import the custom CSS file  

const DashboardChitrangkan = () => {   
    const location = useLocation(); // Use useLocation to access the location  
    const applicantData = location.state?.data || [];   

    const totalApplicant = applicantData.length;  

    // Separate entries by grade  
    const grade2Entries = applicantData.filter(entry => entry.grade === '2');  
    const grade3Entries = applicantData.filter(entry => entry.grade === '3');  
    const grade4Entries = applicantData.filter(entry => entry.grade === '4');  
    const grade5Entries = applicantData.filter(entry => entry.grade === '5');  

    const totalGrade2 = grade2Entries.length;  
    const totalGrade3 = grade3Entries.length;  
    const totalGrade4 = grade4Entries.length;  
    const totalGrade5 = grade5Entries.length;  

    return (  
        <div className='text-3xl lg:text-lg m-auto mt-10 p-6 w-full lg:px-10'>  
            <div className='text-left'>
                <h1 className='text-4xl lg:text-3xl font-bold text-center mb-4'>Chitrangkan Protijogita Applicants Summary</h1>
                <h1 className='font-bold py-4'> Total Applicants: {totalApplicant}</h1>  
                <div className='flex flex-col gap-2'>  
                    <h1> Class Two: {totalGrade2}</h1>  
                    <h1> Class Three: {totalGrade3}</h1>  
                    <h1> Class Four: {totalGrade4}</h1>  
                    <h1> Class Five: {totalGrade5}</h1>  
                </div>  
            </div>  
            
            {/* Grade 2 Table */}  
            <h1 className='text-1xl font-bold p-2 mt-10'>Class Two Applicants</h1>  
            <table className="data-table">  
                <thead>  
                    <tr>  
                        <th>Name</th>  
                        <th>Institution Name</th>  
                        <th>Class</th>  
                        <th>Registration Number</th>  
                    </tr>  
                </thead>  
                <tbody>  
                    {grade2Entries.length > 0 ? (  
                        grade2Entries.map((applicant, index) => (  
                            <tr key={index}>  
                                <td>{applicant.fullName}</td>  
                                <td>{applicant.institutionName}</td>  
                                <td>{applicant.grade}</td>  
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

            {/* Grade 3 Table */}  
            <h1 className='text-1xl font-bold p-2 mt-10'>Class Three Applicants</h1>  
            <table className="data-table">  
                <thead>  
                    <tr>  
                        <th>Name</th>  
                        <th>Institution Name</th>  
                        <th>Class</th>  
                        <th>Registration Number</th>  
                    </tr>  
                </thead>  
                <tbody>  
                    {grade3Entries.length > 0 ? (  
                        grade3Entries.map((applicant, index) => (  
                            <tr key={index}>  
                                <td>{applicant.fullName}</td>  
                                <td>{applicant.institutionName}</td>  
                                <td>{applicant.grade}</td>  
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

            {/* Grade 4 Table */}  
            <h1 className='text-1xl font-bold p-2 mt-10'>Class Four Applicants</h1>  
            <table className="data-table">  
                <thead>  
                    <tr>  
                        <th>Name</th>  
                        <th>Institution Name</th>  
                        <th>Class</th>  
                        <th>Registration Number</th>  
                    </tr>  
                </thead>  
                <tbody>  
                    {grade4Entries.length > 0 ? (  
                        grade4Entries.map((applicant, index) => (  
                            <tr key={index}>  
                                <td>{applicant.fullName}</td>  
                                <td>{applicant.institutionName}</td>  
                                <td>{applicant.grade}</td>  
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

            {/* Grade 5 Table */}  
            <h1 className='text-1xl font-bold p-2 mt-10'>Class Five Applicants</h1>  
            <table className="data-table">  
                <thead>  
                    <tr>  
                        <th>Name</th>  
                        <th>Institution Name</th>  
                        <th>Class</th>  
                        <th>Registration Number</th>  
                    </tr>  
                </thead>  
                <tbody>  
                    {grade5Entries.length > 0 ? (  
                        grade5Entries.map((applicant, index) => (  
                            <tr key={index}>  
                                <td>{applicant.fullName}</td>  
                                <td>{applicant.institutionName}</td>  
                                <td>{applicant.grade}</td>  
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
    );  
};  

export default DashboardChitrangkan;