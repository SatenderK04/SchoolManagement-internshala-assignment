import { Router } from "express";
import addSchool from "../controller/addSchool.js";
import listSchools from "../controller/listSchools.js";

const router = Router();

router.post("/addSchool", addSchool);
router.get("/listSchools", listSchools);

export default router;
