import AuthorType from '../../types/author'
import {GraphQLError, GraphQLInt, GraphQLString} from 'graphql'
import models from '../../../db/models'

export default {
  type: AuthorType,
  args: {
    name: {
      type: GraphQLString,
      name: 'name',
    },
    last_name: {
      type: GraphQLString,
      name: 'last_name',
    },
  },
  resolve: (obj, args, {user}) => {
    // make sure user is logged in
    if (!user) {
      throw new Error('You are not authenticated!')
    }

    if (args.name.length <= 2) {
      throw new GraphQLError('Author\'s name has to be longer then 2 characters')
    }

    if (args.last_name.length <= 2) {
      throw new GraphQLError('Author\'s last name has to be longer then 2 characters')
    }

    // try to find author by ID
    return models.author.create({
      name: args.name,
      last_name: args.last_name
    }).then((newAuthor) => {
      return newAuthor
    })
  },
}
