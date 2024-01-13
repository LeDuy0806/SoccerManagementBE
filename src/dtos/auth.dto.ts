import { IsEmail, IsString } from 'class-validator';

/**
 * @openapi
 * components:
 *  schemas:
 *    LoginDto:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        password:
 *          type: string
 *          default: User*123
 */
export class LoginDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

/**
 * @openapi
 * components:
 *  schemas:
 *    RefreshTokenDto:
 *      type: object
 *      required:
 *        - refreshToken
 *      properties:
 *        refreshToken:
 *          type: string
 */
export class RefreshTokenDto {
  @IsString()
  public refreshToken: string;
}
