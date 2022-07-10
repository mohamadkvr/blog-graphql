import {gql} from 'apollo-server-express';

export default  gql`
   type Query {
       posts(filter:filterInput, pagination: pagination):[Post!]!
       post(id:String):Post!
     }
    type Mutation {
       createPost(data: CreatePost): Boolean!
     }

     input CreatePost {
      title:String!
      userId: String!
      body: String!
      description:String!
     }

     input filterInput {
      value:String
      field:String
     }

     input pagination {
      page:Int
      limit:Int
     }

     type Post {
      id: String
      title:String
      userId: String
      body: String
      likes:[String] 
      dislike: [String]
      description:String
      views: Int
      createAt: Date
     }
       
`

