import {State} from '../ignug/models.index';
import {Catalogue} from '../ignug/models.index';

export interface Answer {
    id?: number;
    code?: string;
    order?: string;
    name?: string;
    value?: string;
    status?: Catalogue;
}
