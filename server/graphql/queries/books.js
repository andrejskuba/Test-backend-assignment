import {
  GraphQLInt,
  GraphQLList,
  GraphQLString
} from 'graphql'
import BookType from '../types/book'
import models from '../../db/models/index'
import Sequelize from 'sequelize'

// query for getting the list of books
const booksQuery = {
  type: GraphQLList(BookType),
  args: {
    limit: {
      type: GraphQLInt,
    },
    offset: {
      type: GraphQLInt,
    },
    search: {
      type: GraphQLString,
    }
  },
  resolve: (root, args, {user}, d) => {
    const Op = Sequelize.Op;
    const offset = args.offset || 0
    const limit = args.limit || 10

    let searchArgs = {}

    // search for a book title
    if (args.search && args.search.length > 0) {
      // TODO: most probably need to sanitize search value
      searchArgs = {
        [Op.or]: [
          {
            '$book.title$': {
              [Op.like]: '%' + args.search + '%'
            }
          },
          {
            '$author.name$': {
              [Op.like]: '%' + args.search + '%'
            }
          },
          {
            '$author.last_name$': {
              [Op.like]: '%' + args.search + '%'
            }
          }
        ]
      }
    }

    return models.book.findAll({
      where: searchArgs,
      order: [
        ['title', 'ASC'],
      ],
      include: [{
        model: models.author,
        required: false
      }],
      offset,
      limit
    })
  }
}

export default booksQuery
