import {User, Role, Permission} from './models.index';

export interface Shortcut {
    id?: number;
    image?: string;
    user?: User;
    role?: Role;
    permission?: Permission;
}
