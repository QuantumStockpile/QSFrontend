import { inventoryApi } from '@/lib/api';

export interface Equipment {
  id: number;
  field: string; // Based on the current Model schema
  created_at?: string;
  updated_at?: string;
}

export interface EquipmentCreate {
  field: string;
}

export interface EquipmentUpdate {
  field: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
}

class EquipmentService {
  // Get all equipment with pagination
  async getAllEquipment(limit: number = 50, offset: number = 0): Promise<PaginatedResponse<Equipment>> {
    try {
      const response = await inventoryApi.get('/', {
        params: { limit, offset }
      });
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to fetch equipment');
    }
  }

  // Get equipment by ID
  async getEquipmentById(id: number): Promise<Equipment | null> {
    try {
      // Using the existing clientele endpoint for now
      const response = await inventoryApi.get(`/clientele/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch equipment');
    }
  }

  // Create new equipment
  async createEquipment(equipment: EquipmentCreate): Promise<Equipment> {
    try {
      const response = await inventoryApi.post('/', equipment);
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to create equipment');
    }
  }

  // Update equipment
  async updateEquipment(id: number, equipment: EquipmentUpdate): Promise<Equipment | null> {
    try {
      const response = await inventoryApi.put(`/${id}`, equipment);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw new Error('Failed to update equipment');
    }
  }

  // Delete equipment
  async deleteEquipment(id: number): Promise<boolean> {
    try {
      const response = await inventoryApi.delete(`/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return false;
      }
      throw new Error('Failed to delete equipment');
    }
  }
}

export const equipmentService = new EquipmentService(); 