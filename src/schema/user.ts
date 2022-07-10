import {gql} from 'apollo-server-express';

export default  gql`
      extend type Query{
        users:[User]!
      }
      
      extend type Mutation {
        signUp(data: createUser): Boolean!
        signIn(data:SignIn):String!
      }

      input createUser{
        name: String!
        password : String!
        email: String!
      }
      input SignIn {
         email: String
         password: String
      }
      enum Gender {
        male
        female
      }  

      type User {
        name: String!
        lastName: String!
        password: String!
        email: String!
        gender: Gender!
        degreeOfEducation: String
        field: [String!]
        birthDate: Date 
      }       
`

