import user from './user'
import post from './post'
import {gql} from 'apollo-server-express'

const Query = gql`

  scalar Date

  scalar DateTime

  scalar Upload


  type Query {

    _: Boolean

  }


  type Mutation {

    _: Boolean

  }

`;

export default [
    Query,
    user,
    post
]