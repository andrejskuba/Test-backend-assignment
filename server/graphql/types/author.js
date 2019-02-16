import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql'

import BookType from './book'
import models from '../../db/models/index'

export default new GraphQLObjectType({
  name: 'Author',
  description: 'Author of a book',
  fields: () => {
    return {
      id: {
        type: GraphQLID,
        description: "Author's ID",
        resolve: author => author.id
      },
      name: {
        type: GraphQLString,
        description: "Author's name",
        resolve: author => author.name
      },
      last_name: {
        type: GraphQLString,
        description: "Author's last name",
        resolve: author => author.last_name
      },
      books: {
        type: new GraphQLList(BookType),
        description: "Author's books",
        resolve: author => {
          if (author.hasOwnProperty('books')) {
            return author.books
          }
          return models.book.findAll({where: {author_id: author.id}})
        }
      }
    }
  }
})
