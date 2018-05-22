import gql from 'graphql-tag';
import { Post } from '../models/Post';

export const CREATE_POST_SUBSCRIPTION = gql`
 subscription createPost {
  Post(
    filter: {
      mutation_in: [CREATED]
    }
  ) {
    mutation
    node {
      id
      title
      description
      createdAt
      likes
      votes {
        id
        user {
          id
        }
      }
      _commentsMeta {
        count
      }
    }
  }
}`;

export interface CreatePostSubscriptionResponse {
  createPost: Post;
  loading: boolean;
}
