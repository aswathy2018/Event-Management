import { BaseRepository } from "./base.repository";
import { IUser, User } from "../models/user.model";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IGetUsersQueryDTO } from "../dtos/user.dto";

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this._model.findOne({ email }).select("+password").exec();
  }

  async findUsersWithPagination(
    options: IGetUsersQueryDTO
  ): Promise<{ users: IUser[]; total: number }> {
    const page = Math.max(1, Number(options.page) || 1);
    const limit = Math.max(1, Number(options.limit) || 10);
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};

    if (options.role && options.role !== "all") {
      filter.role = options.role;
    }

    if (options.status && options.status !== "all") {
      filter.isActive = options.status === "active";
    }

    if (options.search && options.search.trim() !== "") {
      const searchRegex = new RegExp(options.search.trim(), "i");
      filter.$or = [{ name: searchRegex }, { email: searchRegex }];
    }

    const [total, users] = await Promise.all([
      this._model.countDocuments(filter),
      this._model
        .find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec()
    ]);

    return { users, total };
  }

  async updateStatus(userId: string, isActive: boolean): Promise<IUser | null> {
    return await this._model
      .findByIdAndUpdate(userId, { isActive }, { new: true })
      .select("-password")
      .exec();
  }
}

