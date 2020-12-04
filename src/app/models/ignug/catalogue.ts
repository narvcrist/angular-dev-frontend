import {State} from '../ignug/models.index';

export interface Catalogue {
    id?: number;
    parent?: Catalogue;
    code?: string;
    name?: string;
    type?: string;
    color?: string;
    icon?: string;
    state?: State;
    children?: Array<Catalogue>;
}
