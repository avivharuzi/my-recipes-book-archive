import { Image } from '../../shared/shared/image';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  profileImage?: Image;
}
