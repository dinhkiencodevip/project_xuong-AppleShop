export interface Users {
  id?: string;
  email: string;
  password: string;
  confirmPass: string;
  role?: "admin" | "member";
}
