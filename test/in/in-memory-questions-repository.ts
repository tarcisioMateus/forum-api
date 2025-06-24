import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async findBySlug(slug: Slug) {
    const question = this.items.find((item) => item.slug.value === slug.value)

    if (!question) {
      return null
    }

    return question
  }

  async create(question: Question) {
    this.items.push(question)
  }
}
