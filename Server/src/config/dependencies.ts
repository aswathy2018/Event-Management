import { UserRepository } from "../repositories/user.repository";
import { AdminUserService } from "../services/adminUser.service";
import { AdminUserController } from "../controllers/adminUser.controller";

// 1. Repositories
export const userRepository = new UserRepository();

// 2. Services
export const adminUserService = new AdminUserService(userRepository);

// 3. Controllers
export const adminUserController = new AdminUserController(adminUserService);

