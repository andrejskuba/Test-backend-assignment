import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql'
import BookType from '../types/book'
import models from '../../db/models/index'

// query for getting the list of books
const bookQuery = {
  type: BookType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, args, {user}, d) => {
    // make sure user is logged in
    if (!user) {
      throw new Error('You are not authenticated!')
    }
    return models.book.findById(args.id)
  }
}

export default bookQuery
