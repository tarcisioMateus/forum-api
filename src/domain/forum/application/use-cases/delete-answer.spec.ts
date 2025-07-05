import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteAnswerUseCase } from './delete-answer'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete an answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    const response = await sut.execute({
      authorId: 'author-1',
      answerId: 'answer-1',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(null)
    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should Not be able to delete another user answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    const response = await sut.execute({
      authorId: 'author-2',
      answerId: 'answer-1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotAllowedError)
    expect(inMemoryAnswersRepository.items).toHaveLength(1)
  })
})
