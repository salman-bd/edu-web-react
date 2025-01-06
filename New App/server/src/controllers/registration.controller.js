import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Registration } from "../models/registration.model.js";


export const registrationCtlr = asyncHandler( async (req, res) => {
    // console.log(`\nRequest Fields in "req.body": `, req.body);  
    // console.log(`\nRequest Files in "req.files": `, req.files);

    const {fullName, institutionName, contact, medium, grade, fatherName, motherName, isMedhaSelected, isChitrangkanSelected, registrationHeadline} = req.body;


    console.log("\nMedha Onneshon and Chitrangkan Status: ", isMedhaSelected, isChitrangkanSelected);
    
    if (isMedhaSelected === 'true') {
        if ([fullName, institutionName, contact, grade, medium, fatherName, motherName].some((field) => field?.trim() === "")) {
            throw new ApiError(400, "All fields are required")
        }
    } else {
        if ([fullName, institutionName, contact, grade, fatherName, motherName].some((field) => field?.trim() === "")) {
            throw new ApiError(400, "All fields are required")
        }
    }


    // Normalize function  
    const normalize = (value) => (value ? value.trim().toLowerCase() : '');  
 
    const normalizedData = { 
        fullName: normalize(fullName),  
        institutionName: normalize(institutionName),  
        contact: normalize(contact),  
        grade: normalize(grade),
        // Include grade only if it is defined
        ...(medium !== undefined && {medium: normalize(medium)}), 
        fatherName: normalize(fatherName),  
        motherName: normalize(motherName)  
    };  

    const existingRecords = await Registration.find({grade}); // lean() should be used for better performance

    let duplicates = 0;
    existingRecords.forEach((record) => {
        if (record.fullName.toLowerCase() === normalizedData.fullName && 
            record.institutionName.toLowerCase() === normalizedData.institutionName  &&
            record.contact.toLowerCase() === normalizedData.contact &&
            record.grade.toLowerCase() === normalizedData.grade &&
            // record.medium.toLowerCase() === normalizedData.medium &&
            record.fatherName.toLowerCase() === normalizedData.fatherName &&
            record.motherName.toLowerCase() === normalizedData.motherName
        ){
            duplicates = duplicates + 1;
        }
    })

    if (duplicates > 0) { 
        console.log("Duplicates Found: ", duplicates);  
        throw new ApiError(409, "duplicateApplicant");  
    }  
    
    const isPhoto = req.files?.photo;

    if (!isPhoto) {
        throw new ApiError(400, "Applicant must upload a photo")
    }
    
    const photoLocalPath = req.files?.photo[0]?.path;

    if (!photoLocalPath) {
        throw new ApiError(400, "Photo file is required")
    }

    const photo = await uploadOnCloudinary(photoLocalPath);

    if (!photo) {
        throw new ApiError(400, "Photo file is required")
    }
       
    // Retrieve the last registration entry for the specified grade  
    const lastRegistration = await Registration.findOne({ grade })  
        .sort({ registrationNumber: -1 }); // Sort by registrationNumber in descending order  
 
    let registrationNumber = grade + '0000'; // Default value in case there are no previous records  


    if (lastRegistration) {
        const registrationNumberLastRegistration = Number(lastRegistration.registrationNumber)
        registrationNumber = String(registrationNumberLastRegistration + 1); // Increment the last registration number  
    }

    console.log("\nRegistrationNumber data type", typeof registrationNumber);

    const examVenue = "Classic School And College";
    let examDate;
    let examTime;

    if(grade == 2 || grade == 3 || grade == 4 || grade == 5) {
        examTime = "10 AM";
        examDate = "13.12.2024"
    }
    else if(grade == 6 || grade == 7 || grade == 8) {
        examTime = "10 AM";
        examDate = "21.12.2024"
    } else {
        examTime = "12 PM";
        examDate = "21.12.2024"
    }
    // const instructions = "Applicants should arrive at the exam hall at least 30 minutes before the exam starts."
 

    const registration = await Registration.create({
        registrationHeadline,
        fullName,  
        institutionName,  
        contact,  
        ...(medium && { medium }),  
        grade,   
        fatherName,  
        motherName,  
        photo: photo.secure_url,  
        registrationNumber,  
        examVenue,  
        examDate,   
        examTime,
        isMedhaSelected,
        isChitrangkanSelected,
        registrationHeadline
    });

    const newRegistration = await Registration.findById(registration._id).select();

    console.log("\nNew Registration:", newRegistration);
    
    if (!newRegistration) {
        throw new ApiError(500, "Something went wrong while registering the applicant")
    }

    return res.status(201).json(
        new ApiResponse(201, newRegistration, "Applicant Registration Successfull")
    )

} )

export const downloadAdmitCardCtlr = asyncHandler(async (req, res) => {
    const registrationNumber = req.params.registrationNumber;

    console.log("\nRegistraiton Number a user try to download the Admid Card: ", registrationNumber);

    console.log("\nRegistrationNumber data type when user try to download admit card: ", typeof registrationNumber);
    
    const applicant = await Registration.findOne({ registrationNumber });

    // console.log("\nThe Applicant Info:" , applicant);

    const sharedApplicantinfo = {  
        fullName: applicant.fullName ? applicant.fullName.toUpperCase() : applicant.fullName,  
        institutionName: applicant.institutionName ? applicant.institutionName.toUpperCase() : applicant.institutionName,  
        contact: applicant.contact,  
        medium: applicant.medium !== undefined ? applicant.medium.toUpperCase() : applicant.medium, // Conditional check for undefined  
        grade: applicant.grade,  
        fatherName: applicant.fatherName ? applicant.fatherName.toUpperCase() : applicant.fatherName,  
        motherName: applicant.motherName ? applicant.motherName.toUpperCase() : applicant.motherName,  
        photo: applicant.photo,  
        registrationNumber: applicant.registrationNumber,
        examVenue: applicant.examVenue ? applicant.examVenue.toUpperCase() : applicant.examVenue,  
        examDate: applicant.examDate,  
        examTime: applicant.examTime,   
        isMedhaSelected: applicant.isMedhaSelected,  
        isChitrangkanSelected: applicant.isChitrangkanSelected,  
        registrationHeadline: applicant.registrationHeadline,  
    };

    console.log("\nApplicant info after sharing when a user try to downlad admit card: ", sharedApplicantinfo);
    
    
    if (!sharedApplicantinfo) {
        throw new ApiError(404, "The user didn't complete registration")
    }

    return res.status(200).json(
        new ApiResponse(200, sharedApplicantinfo, "Applicant's detail")
    )
})

export const searchAdmitCardCtlr = asyncHandler(async (req, res) => {  
    const { fullName, institutionName, grade } = req.body;  

    // console.log("\nApplicant info when trying to search admit card: ", fullName, institutionName, grade);  

    // Find all applicants matching the criteria  
    const applicants = await Registration.find({  
        $or: [  
            { fullName: fullName, grade: grade },  
            { institutionName: institutionName, grade: grade }  
        ]  
    });  

    // console.log("\nApplicants found: ", applicants);  

    // If no applicants are found, respond with an error  
    if (!applicants || applicants.length === 0) {  
        throw new ApiError(404, "Information didn't match");  
    }  

    // Process applicant information into an array  
    const sharedApplicantInfo = applicants.map(applicant => ({  
        fullName: applicant.fullName ? applicant.fullName.toUpperCase() : applicant.fullName,  
        institutionName: applicant.institutionName ? applicant.institutionName.toUpperCase() : applicant.institutionName,  
        contact: applicant.contact,  
        medium: applicant.medium !== undefined ? applicant.medium.toUpperCase() : applicant.medium,  
        grade: applicant.grade,  
        fatherName: applicant.fatherName ? applicant.fatherName.toUpperCase() : applicant.fatherName,  
        motherName: applicant.motherName ? applicant.motherName.toUpperCase() : applicant.motherName,  
        photo: applicant.photo,  
        registrationNumber: applicant.registrationNumber,  
    }));  

    console.log("\nProcessed applicant info when an applicant search him/her: ", sharedApplicantInfo);  

    // Return the applicant info in the response  
    return res.status(200).json(  
        new ApiResponse(200, sharedApplicantInfo, "Applicants' info based on search")  
    );  
});



export const chitrangkanDashboardCtlr = asyncHandler(async (req, res) => {  

    // Fetch applicants who are selected  
    const applicants = await Registration.find({ isChitrangkanSelected: true });  
    
    // console.log("\nThe Applicants Info: ", applicants);  

    if (applicants.length === 0) {  
        throw new ApiError(404, "No selected applicants found.");  
    }  

    // Create an array to hold shared applicant info  
    const sharedApplicantsInfo = applicants.map(applicant => ({  
        fullName: applicant.fullName ? applicant.fullName.toUpperCase() : applicant.fullName,  
        institutionName: applicant.institutionName ? applicant.institutionName.toUpperCase() : applicant.institutionName,  
        grade: applicant.grade,  
        registrationNumber: applicant.registrationNumber,  
    }));  

    // console.log("Applicants info after sharing for Chitrangkan Dashboard: ", sharedApplicantsInfo);  
    
    // Check if there are valid shared applicants info  
    if (!sharedApplicantsInfo.length) {  
        throw new ApiError(404, "The user didn't complete registration");  
    }  

    return res.status(200).json(  
        new ApiResponse(200, sharedApplicantsInfo, "Applicants' details")  
    );  
});

export const medhaOnneshonDashboardCtlr = asyncHandler(async (req, res) => {

    // Fetch applicants who are selected  
    const applicants = await Registration.find({ isMedhaSelected: true });  
    
    // console.log("\nThe Applicants Info: ", applicants);  

    if (applicants.length === 0) {  
        throw new ApiError(404, "No selected applicants found.");  
    }  

    // Create an array to hold shared applicant info  
    const sharedApplicantsInfo = applicants.map(applicant => ({  
        fullName: applicant.fullName ? applicant.fullName.toUpperCase() : applicant.fullName,  
        institutionName: applicant.institutionName ? applicant.institutionName.toUpperCase() : applicant.institutionName,  
        grade: applicant.grade,  
        medium: applicant.medium,
        registrationNumber: applicant.registrationNumber,  
    }));  

    // console.log("Applicants info after sharing for Medha Onneshon Dashboard: ", sharedApplicantsInfo);  
    
    // Check if there are valid shared applicants info  
    if (!sharedApplicantsInfo.length) {  
        throw new ApiError(404, "The user didn't complete registration");  
    }  

    return res.status(200).json(  
        new ApiResponse(200, sharedApplicantsInfo, "Applicants' details")  
    );  
})