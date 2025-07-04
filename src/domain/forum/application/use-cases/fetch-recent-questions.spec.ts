import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch sorted questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(
        makeQuestion({ createdAt: new Date(2025, 6, i) }),
      )
    }

    const { questions } = await sut.execute({ page: 1 })

    expect(questions[0]).toEqual(
      expect.objectContaining({ createdAt: new Date(2025, 6, 22) }),
    )
    expect(questions[1]).toEqual(
      expect.objectContaining({ createdAt: new Date(2025, 6, 21) }),
    )
    expect(questions[2]).toEqual(
      expect.objectContaining({ createdAt: new Date(2025, 6, 20) }),
    )
  })

  it('should be able to fetch paginated questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(
        makeQuestion({ createdAt: new Date(2025, 6, i) }),
      )
    }

    const { questions } = await sut.execute({ page: 2 })

    expect(questions).toHaveLength(2)
    expect(questions[0]).toEqual(
      expect.objectContaining({ createdAt: new Date(2025, 6, 2) }),
    )
    expect(questions[1]).toEqual(
      expect.objectContaining({ createdAt: new Date(2025, 6, 1) }),
    )
  })
})
