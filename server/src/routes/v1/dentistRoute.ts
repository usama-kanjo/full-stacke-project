import express from "express";
import * as dentistController from "../../controllers/dentistController.js";
import { protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/profile")
  .get(protect, dentistController.getProfile)
  .put(protect, dentistController.updateProfile);

export default router;
