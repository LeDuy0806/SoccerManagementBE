import { ERole } from '@/interfaces';
import {
    IsDateString,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32)
    public password: string;

    @IsString()
    @MaxLength(45)
    @IsOptional()
    public fullname: string;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    public phone: string;

    @IsDateString()
    @IsOptional()
    public dob: Date;

    @IsOptional()
    @IsEnum(ERole)
    public role?: ERole;
}
