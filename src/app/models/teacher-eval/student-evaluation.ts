import { AnswerQuestion } from './answer-question';
import {Student} from '../ignug/models.index';
import {SubjectTeacher} from '../ignug/subject-teacher';

export interface StudentEvaluation {
    id?: number;
    subject_teacher?: SubjectTeacher;
    student?: Student;
    answer_questions?: AnswerQuestion[];
}