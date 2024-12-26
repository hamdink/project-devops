/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  OnModuleInit,
  BadRequestException,
} from "@nestjs/common";
import { User } from "../../core/entities";
import {
  IDataServices,
  IBcryptService,
} from "../../core/abstracts";
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from "../../core/dtos";
import { UserFactoryService } from "./user-factory.service";

import { BASE_URL } from "../../configuration";

import { Role } from "../../core/roles/role.enum";


@Injectable()
export class UserUseCases implements OnModuleInit {
  constructor(
    private dataServices: IDataServices,
    private userFactoryService: UserFactoryService,
    private bcryptService: IBcryptService,
  
  ) {}
  async onModuleInit(): Promise<void> {
    setTimeout(async () => {
      const adminEmail = "contact@touristiquealibaba.com";
      const adminExists = await this.dataServices.users.findByAttribute(
        "email",
        adminEmail,
      );
      if (adminExists) {
        console.log("Admin already exists");
      }
      if (!adminExists) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const adminUserDetails: any = {
          firstName: "Admin",
          lastName: "Ali_Baba",
          avatar: undefined,
          email: adminEmail,
          password: "alibaba123",
          confirmPassword: "alibaba123",
          gender: "male",
          phoneNumber: "22334455",
          role: Role.Admin,
          birthDate: "1999-10-10",
        };

        try {
          await this.createUser(adminUserDetails);
          console.log("Admin user created successfully");
        } catch (error) {
          console.error("Failed to create admin user:", error);
        }
      }
    }, 1000);
  }
  getAllUsers(): Promise<User[]> {
    return this.dataServices.users.getAll();
  }

  async getUserById(id: any): Promise<User> {

    return this.dataServices.users.get(id);
  }
  

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const userExist = await this.dataServices.users.findByAttribute(
        "email",
        createUserDto.email,
      );
      if (userExist) {
        throw new UnauthorizedException("User already exist.");
      }
      createUserDto.password = await this.bcryptService.hashPassword(
        createUserDto.password,
      );
      const user = this.userFactoryService.createNewUser(createUserDto);
      const createdUser = await this.dataServices.users.create(user);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }
  async createAccount(
    createUserDto: CreateUserDto,
    file: Express.Multer.File,
  ): Promise<User> {
    try {
      const userExist = await this.dataServices.users.findByAttribute(
        "email",
        createUserDto.email,
      );
      if (userExist) {
        throw new UnauthorizedException("User already exist.");
      }
      if (createUserDto.password !== createUserDto.confirmPassword) {
        throw new BadRequestException("Passwords do not match.");
      }
      createUserDto.password = await this.bcryptService.hashPassword(
        createUserDto.password,
      );
      createUserDto.confirmPassword= await this.bcryptService.hashPassword(
        createUserDto.confirmPassword,
      );
      
      createUserDto.role = Role.User;
      createUserDto.avatar = file
        ? `${BASE_URL}/uploads/${file.filename}`
        : null;

      const adminEmail = "contact@touristiquealibaba.com";
      const adminExists = await this.dataServices.users.findByAttribute(
        "email",
        adminEmail,
      );
      const newUser = this.userFactoryService.createNewUser({
        ...createUserDto,
      });
      const createdUser = await this.dataServices.users.create(newUser);

     
      return createdUser;
    } catch (error) {
      throw error;
    }
  }


  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
    file: Express.Multer.File,
  ): Promise<User> {
    try {
      const userToUpdate = await this.dataServices.users.get(userId);
      if (!userToUpdate) {
        throw new NotFoundException('User not found');
      }
  
      updateUserDto.avatar = file
        ? `${BASE_URL}/uploads/${file.filename}`
        : undefined;
      const updatedUser = this.userFactoryService.updateUser(updateUserDto);
      return this.dataServices.users.update(userId, updatedUser);
    } catch (error) {
      throw error;
    }
  }
  
  async updateUserPassword(
    userId: string,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<boolean> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new UnauthorizedException("User not found.");
    }
    const isValid = await this.bcryptService.comparePassword(
      updateUserPasswordDto.currentPassword,
      user.password,
    );
    if (!isValid) {
      throw new UnauthorizedException("Invalid Password!.");
    }
    user.password = await this.bcryptService.hashPassword(
      updateUserPasswordDto.newPassword,
    );
    await this.dataServices.users.update(userId, user);
    return true;
  }
  async findUserByEmail(email: string): Promise<User> {
    const user = await this.dataServices.users.findByAttribute("email", email);

    if (!user) throw new NotFoundException("User not found.");
    return user;
  }
  async deleteUser(id: string): Promise<boolean> {
    const user = await this.dataServices.users.delete(id);
    return user ? true : false;
  }

  async usersStats(): Promise<number> {
    return await this.dataServices.users.countByCriteria({
      role: Role.User,
    });
  }

}
