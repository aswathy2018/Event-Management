export type UserRole = "client" | "company" | "super_admin";

export interface IUserListItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  isAuthenticated: boolean;
  createdAt: string;
}

export interface IPaginatedUsersResponse {
  users: IUserListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IGetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole | "all";
  status?: "all" | "active" | "blocked";
}

