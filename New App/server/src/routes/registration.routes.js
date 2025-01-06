import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { registrationCtlr, downloadAdmitCardCtlr, searchAdmitCardCtlr, chitrangkanDashboardCtlr, medhaOnneshonDashboardCtlr } from "../controllers/registration.controller.js";

const router = Router();

router.route("/").post(upload.fields([
    {name: "photo", maxCount: 1}
]), registrationCtlr, downloadAdmitCardCtlr);


router.route("/admitcard/:registrationNumber").get(downloadAdmitCardCtlr);  
router.route("/search-admitcard/").post(searchAdmitCardCtlr);

router.route("/dashboard/chitrangkan").post(chitrangkanDashboardCtlr);
router.route("/dashboard/medhaonneshon").post(medhaOnneshonDashboardCtlr);

 

export default router;