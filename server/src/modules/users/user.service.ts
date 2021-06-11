import { BadRequest } from '../../errors/bad-request';
import { config } from '../../config';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { EmailTemplateService } from '../shared/email-template.service';
import { ForgotPasswordDto } from '../auth/dto/forgot-password.dto';
import { hashPassword } from '../../utils/hash-password';
import { ImageService } from '../images/image.service';
import { LoginDto } from '../auth/dto/login.dto';
import { NotFound } from '../../errors/not-found';
import { ResendVerificationDto } from '../auth/dto/resend-verification.dto';
import { ResetPasswordDto } from '../auth/dto/reset-password.dto';
import { TokenService } from '../tokens/token.service';
import { TokenType } from '../tokens/token.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserModel } from './user.model';
import { UserPublicDetails } from './user-public-details';

export class UserService {
  static async create(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, email, userName, password } = createUserDto;
    if (await UserService.isEmailAlreadyInUsed(email)) {
      throw new BadRequest(
        'The email address you have entered is already associated with another account.'
      );
    }
    if (await UserService.isUserNameAlreadyInUsed(userName)) {
      throw new BadRequest(
        'The username you have entered is already associated with another account.'
      );
    }
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      userName,
      password,
    });
    const { token } = await TokenService.create(
      user,
      TokenType.UserVerification
    );
    await this.sendUserVerificationEmail(token, user);
    return user;
  }

  static async getById(id: string): Promise<User> {
    const user = await UserModel.findById(id).populate('profileImage');
    if (!user) {
      throw new NotFound();
    }
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

  static async verify(token: string): Promise<void> {
    const tokenDetails = await TokenService.findByTokenAndValidate(
      token,
      TokenType.UserVerification
    );
    const user: User = tokenDetails.user;
    if (user.isVerified) {
      await TokenService.delete(tokenDetails.id);
      throw new BadRequest(
        'This account has already been verified. Please log in.'
      );
    }
    await UserModel.findByIdAndUpdate(user.id, {
      isVerified: true,
    });
    await TokenService.delete(tokenDetails.id);
  }

  static async resendVerification(
    resendVerificationDto: ResendVerificationDto
  ): Promise<void> {
    const { email } = resendVerificationDto;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new BadRequest('We were unable to find a account with that email.');
    }
    if (user.isVerified) {
      throw new BadRequest(
        'This account has already been verified. Please log in.'
      );
    }
    const tokenDetails = await TokenService.findByUserAndCreateOrUpdate(
      user,
      TokenType.UserVerification
    );
    if (tokenDetails) {
      await UserService.sendUserVerificationEmail(tokenDetails.token, user);
    }
  }

  static async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto
  ): Promise<void> {
    const { email } = forgotPasswordDto;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new BadRequest('We were unable to find a account with that email.');
    }
    if (!user.isVerified) {
      throw new BadRequest('This account has not yet verified.');
    }
    const tokenDetails = await TokenService.findByUserAndCreateOrUpdate(
      user,
      TokenType.PasswordReset
    );
    if (tokenDetails) {
      await UserService.sendPasswordResetEmail(tokenDetails.token, user);
    }
  }

  static async resetPassword(
    token: string,
    resetPasswordDto: ResetPasswordDto
  ): Promise<void> {
    const tokenDetails = await TokenService.findByTokenAndValidate(
      token,
      TokenType.PasswordReset
    );
    const user: User = tokenDetails.user;
    const { password } = resetPasswordDto;
    await UserService.changePassword(user.id, password);
    await TokenService.delete(tokenDetails.id);
  }

  static async changePassword(id: string, password: string): Promise<void> {
    const hash = await hashPassword(password);
    await UserModel.findByIdAndUpdate(id, {
      password: hash,
    });
  }

  static async login(loginDto: LoginDto): Promise<User> {
    const { email, userName, password } = loginDto;
    let searchBy: { email?: string; userName?: string };
    if (email) {
      searchBy = { email };
    } else if (userName) {
      searchBy = { userName };
    } else {
      throw new BadRequest('The email or username is required.');
    }
    const user: User | null = await UserModel.findOne(searchBy).populate(
      'profileImage'
    );
    if (!user || !(await user.comparePassword(password))) {
      throw new BadRequest(
        'The username or password you have entered is invalid'
      );
    }
    if (!user.isVerified) {
      throw new BadRequest('This account has not yet verified.');
    }
    return user;
  }

  static async sendUserVerificationEmail(
    token: string,
    user: User
  ): Promise<void> {
    const { email, userName } = user;
    const link = `${config.clientBaseUrl}/auth/verify/${token}`;
    await EmailTemplateService.sendUserVerification(email, {
      userName,
      link,
    });
  }

  static async sendPasswordResetEmail(
    token: string,
    user: User
  ): Promise<void> {
    const { email, userName } = user;
    const link = `${config.clientBaseUrl}/auth/reset-password/${token}`;
    await EmailTemplateService.sendPasswordReset(email, {
      userName,
      link,
    });
  }

  static async updateDetails(
    user: User,
    updateUserDto: UpdateUserDto,
    profileImage: Buffer | string | null
  ): Promise<UserPublicDetails> {
    const { firstName, lastName } = updateUserDto;
    const update: {
      firstName: string;
      lastName: string;
      profileImage?: string;
    } = {
      firstName,
      lastName,
    };

    if (profileImage !== null && user.profileImage?.id) {
      await ImageService.delete(user.profileImage.id);
      update.profileImage = undefined;
    }

    if (Buffer.isBuffer(profileImage)) {
      update.profileImage = (await ImageService.saveAndCreate(profileImage)).id;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(user.id, update, {
      new: true,
    }).populate('profileImage');
    if (!updatedUser) {
      throw new BadRequest('Failed to update account details.');
    }

    return UserService.getPublicDetails(updatedUser);
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
