import {
  GraphQLInt,
  GraphQLList,
} from 'graphql'

import AuthorType from '../types/author'
import models from '../../db/models/index'

// query for getting the list of authors
const authorsQuery = {
  type: GraphQLList(AuthorType),
  args: {
    limit: {
      type: GraphQLInt,
    },
    offset: {
      type: GraphQLInt,
    },
  },
  resolve: (root, args, {user}, d) => {
    // make sure user is logged in
    if (!user) {
      throw new Error('You are not authenticated!')
    }
    const offset = args.offset || 0
    const limit = args.limit || 10
    return models.author.findAll({where: args, include: [{model: models.book}], offset, limit})
  }
}

export default authorsQuery
