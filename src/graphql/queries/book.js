import { gql } from "@apollo/client";

export const LIST_BOOKS = gql`
  query ListBooks {
    listBooks {
      name
      _id
    }
  }
`;

export const BOOKS_SUBSCRIPTION = gql`
    subscription OnBookAdded {
        bookAdded {
            _id,
            name
        }
    }

`