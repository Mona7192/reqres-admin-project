export interface ApiUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

export interface UsersListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ApiUser[];
}

export interface CreateUserResponse {
  id: string;
  name?: string;
  job?: string;
  createdAt?: string;
}

export interface UpdateUserResponse {
  name?: string;
  job?: string;
  updatedAt?: string;
}
