import express from "express";
import { protect } from "../../middlewares/authMiddleware.js";
import * as technicianController from "../../controllers/technicianController.js";

const router = express.Router();

router
  .route("/profile")
  .get(protect, technicianController.getProfile)
  .put(protect, technicianController.updateProfile);

export default router;
