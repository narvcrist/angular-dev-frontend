import {State} from '../ignug/models.index';

export interface File {
    id?: number;
    code: string;
    name: string;
    type: string;
    state?: State;
    uri: string;

}
