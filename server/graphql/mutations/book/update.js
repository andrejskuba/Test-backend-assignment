import {
  GraphQLError,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat
} from 'graphql'

import BookType from '../../types/book'
import models from '../../../db/models/index'

export default {
  type: BookType,
  args: {
    id: {
      type: GraphQLInt,
      name: 'id',
    },
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
    },
  },
  resolve: (source, args, {user}) => {
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
          return models.book
            .findOne({
              attributes: [`id`, `title`, `author_id`, `year`, `genres`, `rating`, `createdAt`, `updatedAt`],
              where: {id: args.id}
            })
            .then((originalBook) => {
              // detect changes
              let bookChanges = {
                book_id: originalBook.id,
                user_id: user.id,
              }
              if (originalBook.title !== args.title) {
                bookChanges.title = args.title
              }
              if (originalBook.author_id !== args.author_id) {
                bookChanges.author_id = args.author_id
              }
              if (originalBook.year !== args.year) {
                bookChanges.year = args.year
              }
              if (originalBook.genres !== args.genres) {
                bookChanges.genres = args.genres
              }
              let rating = args.rating.toFixed(2) * 100;
              if (originalBook.rating !== rating) {
                bookChanges.rating = rating
              }

              console.log(bookChanges);

              return originalBook.update({
                title: args.title,
                author_id: args.author_id,
                year: args.year,
                genres: args.genres,
                rating: rating,
              }).then((newBook) => {
                // log values in the history table
                return models.history.create(bookChanges).then(newHistory => {
                  return newBook
                })
              })
            })
        }
      })

  },
}
