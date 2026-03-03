export interface User {
  id: number | string;
  email: string;
  firstName: string;
  lastName: string;
  name?: string;
  role: string;
  department?: string | null;
  company?: string | null;
  phone?: string;
  active?: boolean;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
