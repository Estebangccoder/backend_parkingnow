import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator";


export class ResetPasswordDto {
  @IsString()
  resetPasswordToken: string;

  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;
}