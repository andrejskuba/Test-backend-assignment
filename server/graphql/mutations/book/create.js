import BookType from '../../types/book'
import {GraphQLError, GraphQLFloat, GraphQLInt, GraphQLString} from 'graphql'
import models from '../../../db/models'

export default {
  type: BookType,
  args: {
    title: {
      type: GraphQLString,
      name: 'title',
    },
    author_id: {
      type: GraphQLInt,
      name: 'author_id',
    },
    year: {
      type: GraphQLInt,
      name: 'year',
    },
    genres: {
      type: GraphQLString,
      name: 'genres',
    },
    rating: {
      type: GraphQLFloat,
      name: 'rating',
    }
  },
  resolve: (obj, args, {user}) => {
    // make sure user is logged in
    if (!user) {
      throw new Error('You are not authenticated!')
    }

    if (args.title.length <= 2) {
      throw new GraphQLError('Book title has to be longer then 2 characters')
    }

    if (args.year <= 0) {
      throw new GraphQLError('Year has to be positive number')
    }

    if (args.author_id <= 0) {
      throw new GraphQLError('Invalid author_id value')
    }

    // try to find author by ID
    return models.author.findOne({where: {id: args.author_id}})
      .then((author) => {
        if (!author) {
          throw new GraphQLError('Invalid author_id value')
        } else {
          // create new book in DB
          return models.book.create({
            title: args.title,
            author_id: author.id,
            year: args.year,
            genres: args.genres,
            rating: args.rating.toFixed(2) * 100,
          }).then((newBook) => {

            // log values in the history table
            return models.history.create({
              book_id: newBook.id,
              user_id: user.id,
              title: args.title,
              author_id: author.id,
              year: args.year,
              genres: args.genres,
              rating: args.rating.toFixed(2) * 100,
            }).then(newHistory => {
              return newBook
            })
          })
        }
      })
  },
}
