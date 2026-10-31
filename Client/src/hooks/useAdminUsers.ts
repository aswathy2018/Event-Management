import { useState, useEffect, useCallback } from "react";
import { adminService } from "../services/admin.service";
import { IUserListItem, UserRole, IGetUsersParams } from "../types/user.types";

interface UseAdminUsersResult {
  users: IUserListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  search: string;
  role: UserRole | "all";
  status: "all" | "active" | "blocked";
  isLoading: boolean;
  errorMessage: string | null;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearch: (search: string) => void;
  setRole: (role: UserRole | "all") => void;
  setStatus: (status: "all" | "active" | "blocked") => void;
  setLimit: (limit: number) => void;
  refetch: () => Promise<void>;
}

export const useAdminUsers = (initialParams?: Partial<IGetUsersParams>): UseAdminUsersResult => {
  const [users, setUsers] = useState<IUserListItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(initialParams?.page || 1);
  const [limit, setLimit] = useState<number>(initialParams?.limit || 10);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [search, setSearchState] = useState<string>(initialParams?.search || "");
  const [role, setRoleState] = useState<UserRole | "all">(initialParams?.role || "all");
  const [status, setStatusState] = useState<"all" | "active" | "blocked">(
    initialParams?.status || "all"
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await adminService.getUsers({
        page,
        limit,
        search,
        role,
        status
      });
      setUsers(data.users);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      setErrorMessage(
        error.response?.data?.message || error.message || "Failed to load users"
      );
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search, role, status]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const setSearch = (newSearch: string) => {
    setSearchState(newSearch);
    setPage(1);
  };

  const setRole = (newRole: UserRole | "all") => {
    setRoleState(newRole);
    setPage(1);
  };

  const setStatus = (newStatus: "all" | "active" | "blocked") => {
    setStatusState(newStatus);
    setPage(1);
  };

  return {
    users,
    total,
    page,
    limit,
    totalPages,
    search,
    role,
    status,
    isLoading,
    errorMessage,
    setPage,
    setSearch,
    setRole,
    setStatus,
    setLimit,
    refetch: fetchUsers
  };
};

