import { api } from "./api";
import { IApiResponse, IGetUsersParams, IPaginatedUsersResponse } from "../types/user.types";

export const adminService = {
  async getUsers(params: IGetUsersParams): Promise<IPaginatedUsersResponse> {
    const response = await api.get<IApiResponse<IPaginatedUsersResponse>>("/admin/users", {
      params
    });
    return response.data.data;
  }
};

