import {Catalogue} from '../ignug/catalogue'
import { State } from '../ignug/state';

export interface EvaluationType {
    id?: number;
    code?: string;
    name?: string;
    percentage?: number;
    global_percentage?: number;
    parent_code?: Catalogue;
    status?: Catalogue;
    state?: State;
   

}
