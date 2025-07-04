import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import {
  PaginationParams,
  DEFAULT_PER_PAGE,
  DEFAULT_PAGE,
} from '@/core/repositories/pagination-params'
import { Optional } from '@/core/types/optional'
import { QuestionComment } from '../../enterprise/entities/question-comment'

interface FetchQuestionCommentsUseCaseRequest extends PaginationParams {
  questionId: string
}

interface FetchQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page = DEFAULT_PAGE,
    perPage = DEFAULT_PER_PAGE,
  }: Optional<
    FetchQuestionCommentsUseCaseRequest,
    'page' | 'perPage'
  >): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
        perPage,
      })

    if (!questionComments.length) {
      throw new Error('No Comment found.')
    }

    return {
      questionComments,
    }
  }
}
