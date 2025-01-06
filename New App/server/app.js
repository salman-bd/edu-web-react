import express from "express";  
import cookieParser from "cookie-parser";  
import cors from "cors";  
import cookieSession from "cookie-session";  
import passport from "passport";  
import helmet from "helmet"; // for security  
import morgan from "morgan"; // for logging  

const app = express();  

const corsOptions = {  
    origin: process.env.CORS_ORIGIN,  
    credentials: true,  
};  

// Middleware  
app.use(helmet());                // Use Helmet for security  
app.use(morgan("dev"));           // Logging middleware  
app.use(cors(corsOptions));        // CORS middleware  
app.use(express.json({ limit: "16kb" }));   // JSON body parsing  
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // URL-encoded body parsing  
app.use(express.static("public")); // Static files serving  
app.use(cookieParser());          // Cookie parsing  

// Cookie Session  
app.use(cookieSession({  
    maxAge: 30 * 86400 * 1000, // expire in 30 days  
    keys: [process.env.cookieKey]  
}));  

app.use(passport.initialize());   // Initialize Passport  
app.use(passport.session());       // Passport session handling  

// Import and use routes   
import userRouter from "./src/routes/user.routes.js";  
import registrationRouter from "./src/routes/registration.routes.js";  
import authRoute from "./src/routes/auth.routes.js";  

app.use("/api/v1/users", userRouter);  
app.use("/api/v1/registration", registrationRouter);   
app.use("/api/v1/auth", authRoute);   

// Error handling middleware  
app.use((err, req, res, next) => {  
    console.error(err); // Log the error  
    const statusCode = err.statusCode || 500;  
    const message = err.message || 'Internal Server Error';  
    res.status(statusCode).json({ message });  
});  

export { app };