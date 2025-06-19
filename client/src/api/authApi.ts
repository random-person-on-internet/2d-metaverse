import { api } from "../lib/api";
import type {
  LoginDTO,
  SignupDTO,
  TokenResponse,
} from "../types/authApi.types";

export const signup = (data: SignupDTO) =>
  api.post<TokenResponse>("/auth/signup", data);

export const login = (data: LoginDTO) =>
  api.post<TokenResponse>("/auth/login", data);

export const getProtected = (token: string) =>
  api.get<{ message: string }>("/auth/protected", token);
