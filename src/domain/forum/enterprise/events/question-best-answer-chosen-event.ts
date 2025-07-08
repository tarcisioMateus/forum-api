import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'
import { Question } from '../entities/question'

export class QuestionBestQuestionChosenEvent implements DomainEvent {
  ocurredAt: Date
  question: Question

  constructor(question: Question) {
    this.question = question
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.question.id
  }
}
