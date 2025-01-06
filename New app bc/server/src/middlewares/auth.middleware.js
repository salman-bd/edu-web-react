import { ApiError } from "../utils/apiError.js";  
import { asyncHandler } from "../utils/asyncHandler.js";  
import jwt from "jsonwebtoken";  
import { User } from "../models/user.model.js";  

export const verifyJWT = asyncHandler(async (req, _, next) => {  
    try {  
        // Check for the token in cookies or headers  
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");  

        if (!token) {  
            throw new ApiError(401, "Unauthorized request: Token missing");  
        }  

        // Verify the token  
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);  
        
        // Log decoded token for debugging  
        console.log("\nDecoded access token: ", decodedToken);  

        // Fetch the user associated with the token  
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");  

        if (!user) {  
            throw new ApiError(401, "Unauthorized request: User not found for this token");  
        }  

        // Assign the user to request object  
        req.user = user;  

        // Proceed to the next middleware or route handler  
        next();  
    } catch (error) {  
        console.error("Authentication error: ", error); // Log the error for debugging  
        throw new ApiError(401, error?.message || "Invalid access token");  
    }  
});