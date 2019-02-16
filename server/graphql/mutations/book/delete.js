// update book handler
import {
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'

import BookType from '../../types/book'
import models from '../../../db/models/index'

export default {
  type: BookType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      name: 'id',
    }
  },
  resolve: (obj, args, {user}) => {
    // make sure user is logged in
    if (!user) {
      throw new Error('You are not authenticated!')
    }

    return models.book
      .findById(args.id)
      .then((book) => {
        return book.destroy({force: true})
      })
  },
}
