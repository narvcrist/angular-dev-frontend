import {Catalogue} from '../ignug/catalogue';
import {Permission, User} from './models.index';

export interface Role {
    id?: number;
    code?: string;
    name?: string;
    uri?: string;
    description?: string;
    system?: Catalogue;
    permissions?: Permission[];
    users?: User[];
}
