import { UserModel } from './user/user.state';

export { default as UserActions } from './user/user.action';

export interface StateStore {
    user: UserModel;
}
