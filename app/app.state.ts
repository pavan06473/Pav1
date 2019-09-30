import { User } from './user/user.model';

export interface AppState {
  readonly users: User[];
}