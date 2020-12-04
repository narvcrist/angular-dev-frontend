import { Evaluation } from '../teacher-eval/models.index'
import {State} from '../ignug/models.index';

export interface DetailEvaluation {
    id?: number;
    evaluation?: Evaluation;
    state?: State;
}