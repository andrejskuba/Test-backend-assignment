import express from 'express'
import compress from 'compression'
import bodyParser from 'body-parser'
import graphqlHTTP from 'express-graphql'
import schema from './graphql/schema'
import jwt from 'express-jwt'

// set-up database
import models from './db/models/index'

const app = express()

app.use(compress())

const auth = jwt({
  secret: 'v2Sb337_T0p*S3cRt',
  credentialsRequired: false
})

app.use('/graphql', bodyParser.json(), auth, graphqlHTTP(req =>
  ({
    schema: schema,
    context: req,
    graphiql: true
  })
))

app.listen(8000, 'localhost', () => {
  console.debug('Server is running at http://localhost:8000')
})

export default app
