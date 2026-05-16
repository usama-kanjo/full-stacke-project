import express from "express";
import { protect } from "../../middlewares/authMiddleware.js";
import * as dentistController from "../../controllers/dentistController.js";

const router = express.Router();

router
  .route("/profile")
  .get(protect, dentistController.getProfile)
  .put(protect, dentistController.updateProfile);

export default router;
