import { ERole } from '@/interfaces';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserDto:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - username
 *        - phone
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        password:
 *          type: string
 *          default: User*123
 *        username:
 *          type: string
 *          default: Jane Doe
 *        phone:
 *          type: string
 *          default: 0923456789
 */

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
  public username: string;

  @IsString()
  @IsPhoneNumber()
  @MaxLength(45)
  public phone: string;

  @IsDateString()
  @IsOptional()
  public dob?: Date;

  @IsOptional()
  @IsEnum(ERole)
  public role?: ERole;
}
