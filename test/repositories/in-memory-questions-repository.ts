import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async findBySlug(slug: Slug) {
    const question = this.items.find((item) => item.slug.value === slug.value)

    if (!question) {
      return null
    }

    return question
  }

  async fetchManyRecent({
    page,
    perPage,
  }: PaginationParams): Promise<Question[]> {
    const questions = this.items
      .sort(
        (a: Question, b: Question) =>
          b.createdAt.getTime() - a.createdAt.getTime(),
      )
      .splice((page - 1) * perPage, page * perPage)

    return questions
  }

  async create(question: Question) {
    this.items.push(question)
  }

  async save(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id.toValue() === question.id.toValue(),
    )

    this.items[questionIndex] = question
  }

  async delete(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id.toValue() === question.id.toValue(),
    )

    this.items.splice(questionIndex, 1)
  }
}
