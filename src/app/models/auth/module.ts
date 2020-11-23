import {State} from '../ignug/models.index';

export interface Module {
    id?: number;
    parent_code?: Module;
    code: string;
    name: string;
    type: string;
    icon?: string;
    state: State;
}
