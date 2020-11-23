import {State} from '../ignug/models.index';

export interface SchoolPeriodo {
    id?: number;
    code?: string;
    name?: string;
    start_date?:Date;
    end_date?:Date;
    state?: State;

}
