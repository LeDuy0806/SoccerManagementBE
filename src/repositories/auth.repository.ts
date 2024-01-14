import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '@/config';
import HTTP_STATUS from '@/constants/httpStatus';
import { CreateUserDto, LoginDto, RefreshTokenDto } from '@/dtos';
import { HttpException } from '@/exceptions/httpException';
import { DataStoredInToken, ETokenType, IUser, TokenData, TokenPayload } from '@/interfaces';
import { User } from '@/models/schema';
import { compare, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { Service } from 'typedi';

const createToken = (user: IUser, exp: number | string, type: ETokenType): TokenData => {
  const dataStoredInToken: DataStoredInToken = {
    id: user._id!.toString(),
    role: user.role,
    type: type,
  };

  return {
    expiresIn: exp,
    token: sign(dataStoredInToken, ACCESS_TOKEN_SECRET!, { expiresIn: exp }),
  };
};

@Service()
export class AuthRepository {
  public async signup(userData: CreateUserDto): Promise<{ token: TokenPayload; signUpUserData: IUser }> {
    const findUser = await User.findOne({ email: userData.email });
    if (findUser) throw new HttpException(HTTP_STATUS.CONFLICT, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData = new User({
      ...userData,
      password: hashedPassword,
    });

    await createUserData.save();

    const accessTokenExp = '8h';
    const refreshTokenExp = '24h';

    const { token: accessToken } = createToken(createUserData, accessTokenExp, ETokenType.ACCESS);

    const { token: refreshToken } = createToken(createUserData, refreshTokenExp, ETokenType.REFRESH);

    createUserData.refreshToken = refreshToken;
    createUserData.save();

    return {
      token: { accessToken, refreshToken },
      signUpUserData: createUserData,
    };
  }

  public async login(userData: LoginDto): Promise<{ token: TokenPayload; findUser: IUser }> {
    const findUser = await User.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(HTTP_STATUS.CONFLICT, `This email ${userData.email} was not found`);
    if (findUser.isActive === false) throw new HttpException(HTTP_STATUS.CONFLICT, `This user was disabled`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);

    if (!isPasswordMatching) throw new HttpException(HTTP_STATUS.CONFLICT, 'Password not matching');

    const accessTokenExp = 60 * 60;
    const refreshTokenExp = 24 * 60 * 60;

    const { token: accessToken } = createToken(findUser, accessTokenExp, ETokenType.ACCESS);

    const { token: refreshToken } = createToken(findUser, refreshTokenExp, ETokenType.REFRESH);

    findUser.refreshToken = refreshToken;
    findUser.save();

    return { token: { accessToken, refreshToken }, findUser };
  }

  public async refreshToken(tokenData: RefreshTokenDto): Promise<{ token: string }> {
    const { refreshToken } = tokenData;
    const { id, type } = verify(refreshToken, REFRESH_TOKEN_SECRET!) as DataStoredInToken;

    if (type !== ETokenType.REFRESH) throw new HttpException(HTTP_STATUS.FORBIDDEN, 'Access permission denied!');

    const findUser = await User.findById(id);
    if (!findUser) throw new HttpException(HTTP_STATUS.CONFLICT, `This user ${id} was not found`);
    if (findUser.isActive === false) throw new HttpException(HTTP_STATUS.CONFLICT, `This user ${id} was not active`);

    const accessTokenExp = 60 * 60;
    const { token } = createToken(findUser, accessTokenExp, ETokenType.ACCESS);

    return { token };
  }
}
