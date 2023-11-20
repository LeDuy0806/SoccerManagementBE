import { User } from '@/models';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export interface Token {
  token: string;
  expiredAt: string;
}

export interface LoginResponse {
  user: User;
  accessToken: Token;
  refreshToken: Token;
}
