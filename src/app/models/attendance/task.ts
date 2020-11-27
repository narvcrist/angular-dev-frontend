import {Catalogue, Observation, State} from '../ignug/models.index';
import {Attendance} from './models.index';

export interface Task {
    id?: number;
    attendance?: Attendance;
    description?: string;
    percentage_advance?: number;
    type?: Catalogue;
    state?: State;
    observations?: Observation[];
    observation?: string;
}
