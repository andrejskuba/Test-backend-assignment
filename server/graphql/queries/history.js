import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} from 'graphql'
import HistoryType from '../types/history'
import models from '../../db/models/index'

// query for getting the list of books
const historyQuery = {
  type: new GraphQLList(HistoryType),
  args: {
    book_id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, args, {user}, d) => {
    // make sure user is logged in
    if (!user) {
      throw new Error('You are not authenticated!')
    }
    return models.history.findAll({
      where:{book_id:args.book_id},
      order: [
        ['id', 'ASC'],
      ],
      include: [{
        model: models.author,
        required: false
      }]
    }.id)
  }
}

export default historyQuery
