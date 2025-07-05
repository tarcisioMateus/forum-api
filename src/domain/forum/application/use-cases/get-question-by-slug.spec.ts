import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create an question', async () => {
    const newQuestion = makeQuestion({ slug: Slug.create('question-title') })

    await inMemoryQuestionsRepository.create(newQuestion)

    const response = await sut.execute({
      slug: 'question-title',
    })

    expect(response.isRight()).toBeTruthy()
    if (response.isRight()) {
      expect(response.value.question.id).toBeTruthy()
    }
  })
})
