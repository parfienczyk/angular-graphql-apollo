import gql from 'graphql-tag';
import { Comment } from '../models/comment';

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateCommentMutation($content: String!, $postId: ID!, $authorId: ID!) {
    createComment(content: $content, postId: $postId, authorId: $authorId) {
      id
      content
      createdAt
      post {
        id
      }
    }
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
      title
    }
  }
`;

export interface CreateCommentMutationResponse {
  createComment: Comment;
  loading: boolean;
}
