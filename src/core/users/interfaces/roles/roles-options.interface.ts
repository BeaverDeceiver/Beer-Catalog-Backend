export interface IRolesOptions {
  offset?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
  name?: string;
  permissionMask?: number;
  url?: string;
}
