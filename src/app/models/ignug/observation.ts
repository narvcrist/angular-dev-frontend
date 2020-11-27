import {State} from './models.index';

export interface Observation {
    id?: number;
    old_values?: string;
    new_values?: string;
    description?: string;
    state?: State;
}
