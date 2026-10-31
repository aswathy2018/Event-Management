import { IBaseRepository } from "./IBaseRepository";
import { IUser } from "../../models/user.model";
import { IGetUsersQueryDTO } from "../../dtos/user.dto";

export interface IUserRepository extends IBaseRepository<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
  findUsersWithPagination(options: IGetUsersQueryDTO): Promise<{ users: IUser[]; total: number }>;
  updateStatus(userId: string, isActive: boolean): Promise<IUser | null>;
}

