import { Router } from "express";
import adminUserRoutes from "./adminUser.routes";

const router = Router();

router.use("/admin/users", adminUserRoutes);

export default router;

