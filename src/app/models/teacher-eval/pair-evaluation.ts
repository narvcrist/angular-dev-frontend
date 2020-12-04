import { AnswerQuestion } from './answer-question';
import { DetailEvaluation } from '../teacher-eval/models.index'

export interface PairEvaluation {
    id?: number;
    detail_evaluation?: DetailEvaluation;
    answer_questions?: AnswerQuestion[];
}