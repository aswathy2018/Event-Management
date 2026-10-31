import { IGetUsersQueryDTO, IPaginatedUsersResponseDTO } from "../../dtos/user.dto";

export interface IAdminUserService {
  getUsers(query: IGetUsersQueryDTO): Promise<IPaginatedUsersResponseDTO>;
}

