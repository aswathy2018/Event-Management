import { Request, Response } from "express";
import { IAdminUserService } from "../interfaces/service/IAdminUserService";
import { IGetUsersQueryDTO } from "../dtos/user.dto";
import { ResponseHelper } from "../utils/ResponseHelper";
import { StatusCode } from "../constants/statusCode";
import { ADMIN_MESSAGES } from "../constants/messages";
import { catchAsync } from "../utils/catchAsync";
import { UserRole } from "../constants/roles";

export class AdminUserController {
  constructor(private _adminUserService: IAdminUserService) {}

  getUsers = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const query: IGetUsersQueryDTO = {
      page: req.query.page ? Number(req.query.page) : 1,
      limit: req.query.limit ? Number(req.query.limit) : 10,
      search: req.query.search ? String(req.query.search) : undefined,
      role: req.query.role ? (req.query.role as UserRole | "all") : "all",
      status: req.query.status ? (req.query.status as "all" | "active" | "blocked") : "all"
    };

    const paginatedResult = await this._adminUserService.getUsers(query);

    ResponseHelper.success(
      res,
      StatusCode.OK,
      ADMIN_MESSAGES.USERS_FETCHED_SUCCESS,
      paginatedResult
    );
  });
}

