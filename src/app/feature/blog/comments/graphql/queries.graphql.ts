import gql from 'graphql-tag';
import { Comment } from './../models/comment';

export const ALL_COMMENTS_FOR_POST = gql`
  query AllCommentsForPost($id: ID!, $first: Int, $skip: Int) {
    Post(id: $id) {
      id
      comments (orderBy: createdAt_DESC, first: $first, skip: $skip) {
        id
        content
        createdAt
        author {
          firstName
          lastName
          avatarUrl
        }
      }
      _commentsMeta {
        count
      }
    }
  }
`;

export const ONE_COMMENT_QUERY = gql`
  query OneCommentQuery($id: ID) {
    Comment(id: $id){
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`;

export const ONE_POSTS_QUERY_FRAGMENT = gql`
  fragment post on Post {
      id
      comments (orderBy: createdAt_DESC, first: 5, skip: 0) {
        id
      }
      _commentsMeta {
        count
      }
    }
`;


const CommentsPage = {
  fragments: {
    comment: gql`
      fragment CommentsForPost on Post {
        id
        comments (orderBy: createdAt_DESC, first: 5, skip: 0) {
          id
        }
        _commentsMeta {
          count
        }
      }
    `,
  }
};


export interface AllCommentQueryResponse {
  allComments: Comment[];
  loading: boolean;
}

