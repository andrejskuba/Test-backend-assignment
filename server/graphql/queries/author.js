import {
  GraphQLID,
  GraphQLList, GraphQLNonNull,
} from 'graphql'

import AuthorType from '../types/author'
import models from '../../db/models/index'

// query for getting the list of authors
const authorQuery = {
  type: AuthorType,
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
    return models.author.findById(args.id)
  }
}

export default authorQuery
