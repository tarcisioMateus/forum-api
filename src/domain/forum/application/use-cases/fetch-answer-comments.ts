import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import {
  PaginationParams,
  DEFAULT_PER_PAGE,
  DEFAULT_PAGE,
} from '@/core/repositories/pagination-params'
import { Optional } from '@/core/types/optional'
import { AnswerComment } from '../../enterprise/entities/answer-comment'

interface FetchAnswerCommentsUseCaseRequest extends PaginationParams {
  answerId: string
}

interface FetchAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page = DEFAULT_PAGE,
    perPage = DEFAULT_PER_PAGE,
  }: Optional<
    FetchAnswerCommentsUseCaseRequest,
    'page' | 'perPage'
  >): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
        perPage,
      })

    if (!answerComments.length) {
      throw new Error('No Comment found.')
    }

    return {
      answerComments,
    }
  }
}
