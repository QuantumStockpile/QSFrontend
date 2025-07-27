import { usersApi } from '@/lib/api';

export interface LoginCredentials {
  username: string; // Note: backend expects email as username
  password: string;
}

export interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

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

class AuthService {
  // Login user
  async login(credentials: LoginCredentials): Promise<TokenResponse> {
    try {
      // FastAPI OAuth2PasswordRequestForm expects form data
      const formData = new FormData();
      formData.append('username', credentials.username); // email goes in username field
      formData.append('password', credentials.password);

      const response = await usersApi.post('/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const tokens: TokenResponse = response.data;
      
      // Store tokens
      localStorage.setItem('access_token', tokens.access_token);
      localStorage.setItem('refresh_token', tokens.refresh_token);
      
      return tokens;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error('Invalid email or password');
      }
      throw new Error('Login failed. Please try again.');
    }
  }

  // Register new user
  async signUp(userData: SignUpData): Promise<User> {
    try {
      const response = await usersApi.post('/users/', userData);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error('User already exists');
      }
      throw new Error('Registration failed. Please try again.');
    }
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Get access token
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Get refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  // Refresh access token (if needed)
  async refreshToken(): Promise<TokenResponse> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await usersApi.post('/refresh', {
        refresh_token: refreshToken,
      });

      const tokens: TokenResponse = response.data;
      
      // Update stored tokens
      localStorage.setItem('access_token', tokens.access_token);
      localStorage.setItem('refresh_token', tokens.refresh_token);
      
      return tokens;
    } catch (error) {
      this.logout();
      throw new Error('Session expired. Please login again.');
    }
  }
}

export const authService = new AuthService(); 