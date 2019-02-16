import {GraphQLString} from 'graphql'
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import models from '../../../db/models'

export default {
  type: GraphQLString,
  args: {
    email: {
      type: GraphQLString,
      name: 'email',
    },
    password: {
      type: GraphQLString,
      name: 'password',
    },
  },
  resolve: (obj, {email, password}) => {

    return models.user.findOne({where:{email:email}}).then(user => {
      if (!user) {
        throw new Error('No user with that email')
      }

      const valid = bcrypt.compareSync(password, user.password)

      if (!valid) {
        throw new Error('Incorrect password')
      }

      // return json web token
      return jsonwebtoken.sign(
        {
          id: user.id,
          email: user.email
        },
        'v2Sb337_T0p*S3cRt',
        {expiresIn: '1d'}
      )
    })

  }
}
