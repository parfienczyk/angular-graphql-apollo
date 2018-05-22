import gql from 'graphql-tag';
import { Post } from '../models/Post';

export const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($title: String!, $description: String!) {
    createPost(title: $title, description: $description) {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
      title
    }
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation LikePost($id: ID!, $likes: Int) {
    updatePost(id: $id, likes: $likes) {
      likes
    }
  }
`;

export const CREATE_VOTE_MUTATION = gql`
  mutation CreateVoteMutation($userId: ID!, $postId: ID!) {
    createVote(userId: $userId, postId: $postId) {
      id
      post {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

export interface CreatePostMutationResponse {
  createPost: Post;
  loading: boolean;
}
