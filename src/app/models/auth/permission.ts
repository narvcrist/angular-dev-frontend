import {Institution, State} from '../ignug/models.index';
import {Role, Route, Shortcut} from './models.index';

export interface Permission {
    id?: number;
    actions: string[];
    state: State;
    route: Route;
    role: Role;
    institution: Institution;
    shortcut: Shortcut;
}
