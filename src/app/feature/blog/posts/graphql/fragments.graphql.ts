import gql from 'graphql-tag';

export const ONE_POSTS_QUERY_FRAGMENT = gql`
  fragment post on Post {
      id
      comments {
        id
      }
    }
`;

export const ONE_POST_LIKES_FRAGMENT = gql`
  fragment likes on Post {
      likes
    }
`;
