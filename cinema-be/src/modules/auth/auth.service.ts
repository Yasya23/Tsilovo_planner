import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from 'src/models/user.model';
import { AuthDto, RefreshTokenDto, RegistrationDto } from 'src/typing/dto';
import { hash, genSalt, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: AuthDto) {
    const user = await this.userModel.findOne({
      email: loginDto.email,
    });

    if (!user) {
      throw new UnauthorizedException("User with this email doesn't found");
    }

    const isPasswordValid = await compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong password');
    }

    const tokens = await this.createTokenPair(user.id);
    console.log(tokens);
    if (!tokens) {
      throw new UnauthorizedException('Error to get token');
    }

    return {
      id: user.id,
      ...tokens,
    };
  }

  async register(registrationDto: RegistrationDto) {
    const user = await this.userModel.findOne({
      email: registrationDto.email,
    });

    if (user) {
      throw new BadRequestException('User with this email already exists');
    }
    const numberForSaltGenerator = 10;
    const salt = await genSalt(numberForSaltGenerator);

    const createUser = new this.userModel({
      ...registrationDto,
      password: await hash(registrationDto.password, salt),
    });
    await createUser.save();
    const tokens = await this.createTokenPair(createUser.id);

    return {
      id: createUser.id,
      ...tokens,
    };
  }

  async getNewTokens({ refrehToken }: RefreshTokenDto) {
    if (!refrehToken) {
      throw new UnauthorizedException('Please Sing in');
    }

    const result = await this.jwtService.verifyAsync(refrehToken);

    if (!result) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const user = await this.userModel.findById(result.id);
    const tokens = await this.createTokenPair(user.id);
    return {
      userId: user.id,
      ...tokens,
    };
  }

  async createTokenPair(userId: string) {
    const data = { id: userId };
    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '21d',
    });
    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '10h',
    });
    return { refreshToken, accessToken };
  }
}
