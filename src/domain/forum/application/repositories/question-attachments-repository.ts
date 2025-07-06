import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export interface QuestionAttachmentsRepository {
  create(questionAttachments: QuestionAttachment[]): Promise<void>
}
