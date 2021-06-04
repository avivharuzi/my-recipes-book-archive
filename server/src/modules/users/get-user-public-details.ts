import { Image } from '../images/image.model';
import { User } from './user.model';

export const getUserPublicDetails = (user: User): UserPublicDetails => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userName: user.userName,
    profileImage: user.profileImage,
  };
};

export interface UserPublicDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  profileImage?: Image;
}
