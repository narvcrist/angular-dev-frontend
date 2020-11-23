import {Catalogue} from '../ignug/catalogue';

export interface Role {
    id?: number;
    code?: string;
    name?: string;
    uri?: string;
    description?: string;
    system?: Catalogue;
}
