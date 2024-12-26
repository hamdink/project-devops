import { Role } from "../roles/role.enum";


export class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
  birthDate: string;
  avatar: string;
  gender: string;
  country: string;
  phoneNumber: string;
  twoFactorCode: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
