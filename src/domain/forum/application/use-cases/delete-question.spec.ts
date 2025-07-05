import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteQuestionUseCase } from './delete-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete an question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const response = await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(null)
    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should Not be able to delete another user question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const response = await sut.execute({
      authorId: 'author-2',
      questionId: 'question-1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotAllowedError)
    expect(inMemoryQuestionsRepository.items).toHaveLength(1)
  })
})
