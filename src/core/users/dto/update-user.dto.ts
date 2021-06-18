import {
  IsEmail,
  IsDateString,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsDateString()
  dob: Date;

  @IsString()
  sex: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  city?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  photo?: string;
}
