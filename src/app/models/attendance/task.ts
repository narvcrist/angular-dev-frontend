import {Catalogue, State} from '../ignug/models.index';
import {Attendance} from './models.index';

export interface Task {
    id?: number;
    attendance?: Attendance;
    description?: string;
    percentage_advance?: number;
    observations?: string;
    type?: Catalogue;
    state?: State;
}
