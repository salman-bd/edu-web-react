// src/DashboardChitrangkan.js  
import React from 'react';  
import { useLocation } from 'react-router-dom'; // Make sure to import useLocation  
import './Dashboard.css'; // Import the custom CSS file  

const DashboardMedha = () => {   
    const location = useLocation(); // Use useLocation to access the location  
    const applicantData = location.state?.data || [];   

    const totalApplicant = applicantData.length;  

    // Separate entries by grade  
    const grade6Entries = applicantData.filter(entry => entry.grade === '6');  
    const grade7Entries = applicantData.filter(entry => entry.grade === '7');  
    const grade8Entries = applicantData.filter(entry => entry.grade === '8');  
    const grade9Entries = applicantData.filter(entry => entry.grade === '9');
    const grade10Entries = applicantData.filter(entry => entry.grade === '10');
    const grade11Entries = applicantData.filter(entry => entry.grade === '11');
    const grade12Entries = applicantData.filter(entry => entry.grade === '12');

    console.log('grade6Entries:' ,grade6Entries);
    

    const totalGrade6 = grade6Entries.length;  
    const totalGrade7 = grade7Entries.length;  
    const totalGrade8 = grade8Entries.length;  
    const totalGrade9 = grade9Entries.length;  
    const totalGrade10 = grade10Entries.length;  
    const totalGrade11 = grade11Entries.length;  
    const totalGrade12 = grade12Entries.length; 
    
    const totalBanglaGrade6 = grade6Entries.filter(entry => entry.medium === 'bangla');
    const totalEnglishGrade6 = grade6Entries.filter(entry => entry.medium === 'english');
    const totalBanglaGrade7 = grade7Entries.filter(entry => entry.medium === 'bangla');
    const totalEnglishGrade7 = grade7Entries.filter(entry => entry.medium === 'english');
    const totalBanglaGrade8= grade8Entries.filter(entry => entry.medium === 'bangla');
    const totalEnglishGrade8 = grade8Entries.filter(entry => entry.medium === 'english');
    const totalBanglaGrade9 = grade9Entries.filter(entry => entry.medium === 'bangla');
    const totalEnglishGrade9 = grade9Entries.filter(entry => entry.medium === 'english');
    const totalBanglaGrade10 = grade10Entries.filter(entry => entry.medium === 'bangla');
    const totalEnglishGrade10 = grade10Entries.filter(entry => entry.medium === 'english');
    const totalBanglaGrade11 = grade11Entries.filter(entry => entry.medium === 'bangla');
    const totalEnglishGrade11 = grade11Entries.filter(entry => entry.medium === 'english');
    const totalBanglaGrade12 = grade12Entries.filter(entry => entry.medium === 'bangla');
    const totalEnglishGrade12 = grade12Entries.filter(entry => entry.medium === 'english');

    console.log('totalBanglaGrade6: ', totalBanglaGrade6.length);
    

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
            
            {/* Grade 2 Table */}  
            <h1 className='text-1xl font-bold p-2 mt-10'>Class Six Applicants</h1>  
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
                            <td colSpan="4" style={{ textAlign: 'center' }}>No data available</td>  
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
    );  
};  

export default DashboardMedha;