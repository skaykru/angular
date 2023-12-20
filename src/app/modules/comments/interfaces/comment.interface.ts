import { Profile } from '../../profile/interfaces/profile.interface';

export interface Comment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: Profile;
}
