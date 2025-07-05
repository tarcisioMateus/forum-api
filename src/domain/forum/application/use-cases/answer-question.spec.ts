import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer Question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })
  it('should be able to create an answer', async () => {
    const response = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'New answer',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(
      expect.objectContaining({
        answer: expect.objectContaining({ content: 'New answer' }),
      }),
    )
  })
})
