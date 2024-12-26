import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "../../../../core/roles/role.enum";

export type UserDocument = User & Document;


@Schema()
export class User {
  @Prop({required: true})
  firstName: string;

  @Prop({required: true})
  lastName: string;

  @Prop({required: true, unique: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true})
  confirmPassword: string;
  

  @Prop({ enum: Object.values(Role), default: Role.User })
  role: Role;

  @Prop()
  birthDate: string;

  @Prop()
  avatar: string;

  @Prop()
  gender: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  country: string;

  @Prop()
  twoFactorCode: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
