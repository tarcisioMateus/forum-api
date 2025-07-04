import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionCommentsRepository {
  findById(id: string): Promise<QuestionComment | null>
  create(QuestionComment: QuestionComment): Promise<void>
  delete(QuestionComment: QuestionComment): Promise<void>
}
