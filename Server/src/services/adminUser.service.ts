import { IAdminUserService } from "../interfaces/service/IAdminUserService";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IGetUsersQueryDTO, IPaginatedUsersResponseDTO } from "../dtos/user.dto";
import { toUserListItemDTO } from "../mappers/user.mapper";
import { Logger } from "../utils/logger";

export class AdminUserService implements IAdminUserService {
  constructor(private _userRepository: IUserRepository) {}

  async getUsers(query: IGetUsersQueryDTO): Promise<IPaginatedUsersResponseDTO> {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 10));

    Logger.info("Fetching users with options", { page, limit, role: query.role, status: query.status });

    const { users, total } = await this._userRepository.findUsersWithPagination({
      ...query,
      page,
      limit
    });

    const userDTOs = users.map(toUserListItemDTO);
    const totalPages = Math.ceil(total / limit) || 1;

    return {
      users: userDTOs,
      total,
      page,
      limit,
      totalPages
    };
  }
}

