import {
  GraphQLInt,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat, GraphQLList
} from 'graphql'

import AuthorType from './author'
import models from '../../db/models/index'

export default new GraphQLObjectType({
  name: 'History',
  description: '...',

  fields: () => {
    return {
      book_id: {
        type: GraphQLID,
        description: 'Book ID',
        resolve: book => book.book_id
      },
      user_id: {
        type: GraphQLInt,
        resolve: book => book.user_id
      },
      title: {
        type: GraphQLString,
        resolve: book => book.title
      },
      author: {
        type: AuthorType,
        description: 'Author of this book',
        resolve: book => {
          if (book.hasOwnProperty('author')) {
            return book.author
          }
          return models.author.findById(book.author_id)
        }
      },
      year: {
        type: GraphQLInt,
        resolve: book => book.year
      },
      genres: {
        type: new GraphQLList(GraphQLString),
        resolve: book => book.genres.split(',').map(item => item.trim())
      },
      rating: {
        type: GraphQLFloat,
        resolve: book => book.rating / 100
      },
      created: {
        type: GraphQLString,
        resolve: book => book.createdAt
      }
    }
  }
})
