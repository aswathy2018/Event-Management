import { Router } from "express";
import { adminUserController } from "../config/dependencies";

const router = Router();

// GET /api/v1/admin/users
router.get("/", adminUserController.getUsers.bind(adminUserController));

export default router;

