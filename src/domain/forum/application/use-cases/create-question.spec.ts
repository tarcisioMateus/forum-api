import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create an question', async () => {
    const response = await sut.execute({
      title: 'question 1',
      authorId: '1',
      content: 'New question',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(
      expect.objectContaining({
        question: expect.objectContaining({ content: 'New question' }),
      }),
    )
  })
})
