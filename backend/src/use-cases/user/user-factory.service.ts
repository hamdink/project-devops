import { Injectable } from "@nestjs/common";
import { User } from "../../core/entities";
import { CreateUserDto, UpdateUserDto } from "../../core/dtos";

@Injectable()
export class UserFactoryService {
  createNewUser(createUserDto: CreateUserDto) {
    const newUser = new User();
    newUser.firstName = createUserDto.firstName;
    newUser.lastName = createUserDto.lastName;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    newUser.confirmPassword = createUserDto.confirmPassword;
    newUser.role = createUserDto.role;
    newUser.birthDate = createUserDto.birthDate;
    newUser.gender = createUserDto.gender;
    newUser.phoneNumber = createUserDto.phoneNumber;
    newUser.avatar = createUserDto.avatar;
    newUser.country = createUserDto.country;
    return newUser;
  }

  updateUser(updateUserDto: UpdateUserDto) {
    const updatedUser = new User();
    updatedUser.firstName = updateUserDto.firstName;
    updatedUser.lastName = updateUserDto.lastName;
    updatedUser.birthDate = updateUserDto.birthDate;
    updatedUser.gender = updateUserDto.gender;
    updatedUser.role = updateUserDto.role;
    updatedUser.phoneNumber = updateUserDto.phoneNumber;
    updatedUser.avatar = updateUserDto.avatar;
    updatedUser.country = updateUserDto.country;
    updatedUser.updatedAt = new Date();

    return updatedUser;
  }
}
