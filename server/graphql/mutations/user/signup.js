import {GraphQLString} from 'graphql'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
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
    // validate email
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid_email = re.test(String(email).toLowerCase())

    if (!valid_email) {
      throw new Error('Invalid email address!')
    }

    return models.user.findOne({where:{email:email}}).then(user => {
      if (user) {
        throw new Error('Email already exists!')
      } else {
        return models.user.create({
          email: email,
          password: bcrypt.hashSync(password, 10),
          createdAt: new Date(),
          updatedAt: new Date()
        }).then(user => {
          // return json web token
          return jsonwebtoken.sign(
            {
              id: user.id,
              email: user.email
            },
            'v2Sb337_T0p*S3cRt',
            {expiresIn: '1y'}
          )
        })
      }
    })
  }
}
