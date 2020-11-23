import {Catalogue, Institution} from '../ignug/models.index';
import {Image} from '../ignug/models.index';
import {Role} from './models.index';
import {Attendance} from '../attendance/attendance';

export interface User {
    id?: string;
    first_name?: string;
    second_name?: string;
    first_lastname?: string;
    second_lastname?: string;
    identification?: string;
    username?: string;
    password?: string;
    new_password?: string;
    password_confirm?: string;
    ethnic_origin?: Catalogue;
    location?: Catalogue;
    identification_type?: Catalogue;
    sex?: Catalogue;
    gender?: Catalogue;
    state?: Catalogue;
    birthdate?: Date;
    email?: string;
    images?: Image[];
    // avatar?: Image;
    avatar?: string;
    roles?: Role[];
    role?: Role;
    institutions?: Institution[];
    attendances?: Attendance[];
    attendance?: Attendance;
}
