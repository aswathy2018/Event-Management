import { IUser } from "../models/user.model";
import { IUserListItemDTO } from "../dtos/user.dto";

export const toUserListItemDTO = (user: IUser): IUserListItemDTO => {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isActive: user.isActive,
    isAuthenticated: user.isAuthenticated,
    createdAt: user.createdAt ? user.createdAt.toISOString() : new Date().toISOString()
  };
};

