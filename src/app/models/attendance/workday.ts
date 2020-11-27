import {State, Catalogue, Observation} from '../ignug/models.index';
import {Attendance} from './models.index';

export interface Workday {
    id?: number;
    attendance?: Attendance;
    start_time?: string;
    duration?: string;
    end_time?: string;
    description?: string;
    type?: Catalogue;
    type_id?: number;
    state?: State;
    state_id?: number;
    observations?: Observation[];
    observation?: string;
}
