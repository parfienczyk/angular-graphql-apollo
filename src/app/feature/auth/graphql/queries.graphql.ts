import gql from 'graphql-tag';

export const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      id
    }
  }
`;

export const ONE_USER_QUERY = gql`
  query OneUserQuery($email: String) {
    User(email: $email) {
      id
      firstName
      lastName
      email
    }
  }
`;

export interface AllUsersQueryResponse {
  allUsers: any[];
  loading: boolean;
}

