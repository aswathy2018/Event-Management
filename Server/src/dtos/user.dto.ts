import { UserRole } from "../constants/roles";

export interface IGetUsersQueryDTO {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole | "all";
  status?: "all" | "active" | "blocked";
}

export interface IUserListItemDTO {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  isAuthenticated: boolean;
  createdAt: string;
}

export interface IPaginatedUsersResponseDTO {
  users: IUserListItemDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

