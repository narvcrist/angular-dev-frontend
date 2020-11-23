import {User} from '../auth/models.index';
import {State} from '../ignug/models.index';
import {Task, Workday} from './models.index';

export interface Attendance {
    id?: number;
    attendanceable?: User;
    date?: Date;
    workdays?: Workday[];
    tasks?: Task[];
    state?: State;
}
