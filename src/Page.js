import React from 'react'
import PropTypes from 'prop-types'
import pageQueries from './Page.queries'

export const Page = ({books, loading}) => {
  if (loading) {
    return <span>Loading data...</span>
  }

  return (
    <table>
      <tr>
        <th>BOOK NAME</th>
        <th>AUTHOR</th>
        <th>YEAR</th>
        <th>RATING</th>
        <th>GENRES</th>
      </tr>
      {
        books.map((book, i) =>
          <tr key={i}>
            <td>{book.title}</td>
            <td>{book.author.name} {book.author.last_name}</td>
            <td>{book.year}</td>
            <td>{book.rating} / 10</td>
            <td>{book.genres.join(', ')}</td>
          </tr>
        )
      }
    </table>
  )
}

Page.propTypes = {
  loading: PropTypes.bool,
  books: PropTypes.array
}

export default pageQueries(Page)
