import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import {
  PaginationParams,
  DEFAULT_PER_PAGE,
  DEFAULT_PAGE,
} from '@/core/repositories/pagination-params'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface FetchRecentQuestionsUseCaseRequest extends PaginationParams {}

type FetchRecentQuestionsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questions: Question[]
  }
>

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page = DEFAULT_PAGE,
    perPage = DEFAULT_PER_PAGE,
  }: Partial<FetchRecentQuestionsUseCaseRequest>): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.fetchManyRecent({
      page,
      perPage,
    })

    if (!questions.length) {
      return left(new ResourceNotFoundError())
    }

    return right({
      questions,
    })
  }
}
