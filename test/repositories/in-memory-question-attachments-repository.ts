import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public items: QuestionAttachment[] = []

  async create(questionAttachments: QuestionAttachment[]): Promise<void> {
    for (const element of questionAttachments) {
      this.items.push(element)
    }
  }
}
