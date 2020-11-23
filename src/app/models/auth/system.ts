import {State} from '../ignug/models.index';

export interface System {
    id?: number;
    code: string;
    name: string;
    type: string;
    icon?: string;
    state: State;
}
