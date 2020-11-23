import {Catalogue, Image, State} from '../ignug/models.index';

export interface Route {
    id?: number;
    uri: string;
    label: string;
    icon?: string;
    order: number;
    description?: string;
    state: State;
    module: Catalogue;
    type: Catalogue;
    status: Catalogue;
    parent?: Catalogue;
    images?: Image[];
}
