import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.model';
import { UserService } from '../users/user.service';

export class AuthService {
  static async signUp(createUserDto: CreateUserDto): Promise<User> {
    return UserService.create(createUserDto);
  }
}
