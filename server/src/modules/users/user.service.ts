import { BadRequest } from '../../errors/bad-request';
import { config } from '../../config';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailTemplateService } from '../shared/email-template.service';
import { TokenService } from '../tokens/token.service';
import { TokenType } from '../tokens/token.model';
import { User, UserModel } from './user.model';
import { UserPublicDetails } from './get-user-public-details';

export class UserService {
  static async create(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, email, userName, password } = createUserDto;
    if (await UserService.isEmailAlreadyInUsed(email)) {
      throw new BadRequest('Email is already in used');
    }
    if (await UserService.isUserNameAlreadyInUsed(userName)) {
      throw new BadRequest('Username is already in used');
    }
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      userName,
      password,
    });
    const token = await TokenService.create(
      user.id,
      TokenType.UserVerification
    );
    const link = `${config.clientBaseUrl}/auth/verify/${token}`;
    await EmailTemplateService.sendUserVerification(user.email, {
      firstName,
      lastName,
      link,
    });
    return user;
  }

  static async isEmailAlreadyInUsed(email: string): Promise<boolean> {
    const user = await UserModel.findOne({ email });
    return !!user;
  }

  static async isUserNameAlreadyInUsed(userName: string): Promise<boolean> {
    const user = await UserModel.findOne({ userName });
    return !!user;
  }

  static getPublicDetails(user: User): UserPublicDetails {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userName: user.userName,
      profileImage: user.profileImage,
    };
  }
}
