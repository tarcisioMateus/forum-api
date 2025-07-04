import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentUseCaseRequest {
  commentId: string
  authorId: string
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    commentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(commentId)

    if (!questionComment) {
      throw new Error('Question Comment not found.')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.questionCommentsRepository.delete(questionComment)

    return {}
  }
}
