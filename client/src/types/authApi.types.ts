export interface SignupDTO {
  email: string;
  password: string;
  username: string;
  avatar?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface TokenResponse {
  Token: string;
}
