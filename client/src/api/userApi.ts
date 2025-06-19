import { api } from "../lib/api";
import type { User } from "../stores/userStore";

export const getMe = (token: string) => api.get<User>("/user/me", token);
