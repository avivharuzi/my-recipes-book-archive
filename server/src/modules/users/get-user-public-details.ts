import { Image } from '../images/image.model';

export interface UserPublicDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  profileImage?: Image;
}
