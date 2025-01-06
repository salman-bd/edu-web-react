import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { registrationCtlr, downloadAdmitCardCtlr, searchAdmitCardCtlr } from "../controllers/registration.controller.js";

const router = Router();

router.route("/").post(upload.fields([
    {name: "photo", maxCount: 1}
]), registrationCtlr, downloadAdmitCardCtlr);


router.route("/admitcard/:registrationNumber").get(downloadAdmitCardCtlr);  
router.route("/search-admitcard/").post(searchAdmitCardCtlr);
 

export default router;