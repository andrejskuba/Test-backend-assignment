import gql from 'graphql-tag'
import {graphql, compose} from 'react-apollo'

const getBooks = gql`
  query getBooks {
    books {
      title
      author {
        id
        name
        last_name
      }
      year
      rating
      genres
    }
  }`

const addBook = gql`
  mutation ($title: String!, $author: String!, $year: Int!) {
    addBook(title: $title, author: $author, year: $year) {
      title
      author
      year
    }
  }`

const updateBook = gql`
  mutation ($id: String!, $title: String!, $author: String!, $year: Int!) {
    updateBook(id: $id, title: $title, author: $author, year: $year) {
      title
      author
      year
    }
  }`

const deleteBook = gql`
  mutation ($id: String!) {
    deleteBook(id: $id) {
      title
      author
      year
    }
  }`

export default compose(
  graphql(getBooks, {
    props: ({ownProps, data}) => data,
  }),
  graphql(addBook, {name: 'addBook'}),
  graphql(updateBook, {name: 'updateBook'}),
  graphql(deleteBook, {name: 'deleteBook'}),
)
