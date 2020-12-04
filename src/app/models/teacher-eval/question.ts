import {State} from '../ignug/models.index';
import {Catalogue} from '../ignug/models.index';
import {EvaluationType} from '../teacher-eval/models.index';

export interface Question {
    id?: number;
    code?: string;
    order?: number;
    name?: string;
    description?: string;
    evaluation_type?: EvaluationType;
    type?: Catalogue;
    state?: State; 
    status?: Catalogue; 
}