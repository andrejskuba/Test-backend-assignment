// update book handler
import {
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'

import AuthorType from '../../types/author'
import models from '../../../db/models/index'

export default {
  type: AuthorType,
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

    return models.author
      .findById(args.id)
      .then((author) => {
        return author.destroy({force: true})
      })
  },
}
