import express from "express";  
import passport from "passport";  
import { Router } from "express";  
import dotenv from "dotenv"; // Ensure you import dotenv  
import passportCtlr from "../controllers/passportAuthController.js";  

// Load environment variables  
dotenv.config();

const googleClientID = process.env.GOOGLE_CLIENT_ID;  
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;   
const facebookAppID = process.env.FACEBOOK_APP_ID;  
const facebookAppSecret = process.env.FACEBOOK_APP_SECRET;  

const router = Router();  

// Root route to get Google credentials  
router.route("/").get((req, res) => {  
    if (!googleClientID || !googleClientSecret) {  
        return res.status(400).json({ error: "Missing Google credentials" }); // Changed to 400  
    }  
    res.status(200).json({  
        googleClientID,  
        googleClientSecret // Spelling correction is fine  
    });  
});  

// Google authentication route  
router.route("/google").get(passportCtlr.authenticate("google", { scope: ["profile", "email"] }));  

// Google authentication callback route  
router.route("/google/callback")  
    .get(passportCtlr.authenticate("google", { failureRedirect: "/login" }),  
        (req, res) => {  
            console.log("Google authentication successful, redirecting to registration...");  
            res.redirect("/registration"); // Redirect after successful login  
        });  

// Facebook authentication route  
router.route("/facebook")  
    .get(passportCtlr.authenticate("facebook"));  

// Facebook authentication callback route  
router.route("/facebook/callback")  
    .get(passportCtlr.authenticate("facebook", { failureRedirect: "/login" }),  
        (req, res) => {  
            console.log("Facebook authentication successful, redirecting to registration...");  
            res.redirect("/registration"); // Redirect after successful login  
        });  

export default router;