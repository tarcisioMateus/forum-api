import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import {
  PaginationParams,
  DEFAULT_PER_PAGE,
  DEFAULT_PAGE,
} from '@/core/repositories/pagination-params'
import { Optional } from '@/core/types/optional'

interface FetchQuestionAnswersUseCaseRequest extends PaginationParams {
  questionId: string
}

interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page = DEFAULT_PAGE,
    perPage = DEFAULT_PER_PAGE,
  }: Optional<
    FetchQuestionAnswersUseCaseRequest,
    'page' | 'perPage'
  >): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page, perPage },
    )

    if (!answers.length) {
      throw new Error('No Answer found.')
    }

    return {
      answers,
    }
  }
}
