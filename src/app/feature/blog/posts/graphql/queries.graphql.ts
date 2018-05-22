import gql from 'graphql-tag';
import { Post } from './../models/Post';

export const ALL_POSTS_QUERY = gql`
  query {
    allPosts {
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
`;

export const ONE_POSTS_QUERY = gql`
  query OnePostQuery($id: ID) {
    Post(id: $id){
      id
      title
      description
      createdAt
      updatedAt
      likes
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

export const COUNT_POSTS = gql`
  query {
    _allPostsMeta {
      count
    }
  }
`;

export interface AllPostQueryResponse {
  allPosts: Post[];
  loading: boolean;
}

