import { usersApi } from "@/lib/api";

export interface User {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  role: {
    id: number;
    description: string;
  };
}

export interface Role {
  id: number;
  description: string;
}

export interface RolePayload {
  description: string;
}

class UserService {
  // Get all users (admin only)
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await usersApi.get("/users/");
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error("Access denied. Admin privileges required.");
      }
      throw new Error("Failed to fetch users");
    }
  }

  // Get all roles (admin only)
  async getAllRoles(): Promise<Role[]> {
    try {
      const response = await usersApi.get("/roles/");
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error("Access denied. Admin privileges required.");
      }
      throw new Error("Failed to fetch roles");
    }
  }

  // Create new role (admin only)
  async createRole(roleData: RolePayload): Promise<Role> {
    try {
      const response = await usersApi.post("/roles/", roleData);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error("Role already exists");
      }
      if (error.response?.status === 403) {
        throw new Error("Access denied. Admin privileges required.");
      }
      throw new Error("Failed to create role");
    }
  }

  // Elevate user to admin (admin only)
  async elevateUser(userEmail: string): Promise<boolean> {
    try {
      const response = await usersApi.post("/roles/elevate", null, {
        params: { target_email: userEmail },
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error("Access denied. Admin privileges required.");
      }
      if (error.response?.status === 404) {
        throw new Error("User not found");
      }
      throw new Error("Failed to elevate user");
    }
  }
}

export const userService = new UserService();
