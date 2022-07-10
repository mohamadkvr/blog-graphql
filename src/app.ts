import { ApolloServer, gql } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import typeDefs from './schema/index'
import  {main} from './config/mongo'
import {Mutation} from './resolvers/mutations';
import {Query} from './resolvers/Queries'
import dotenv from  'dotenv'
import {verifyToken} from './utills/token'
dotenv.config({ path: '../.env'});

async function listen(port: number) {
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Mutation,
      Query
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    csrfPrevention: true,  // highly recommended
    cache: 'bounded',
    context: async({ req }) => {
       const me = await verifyToken(req)
       return me
    },
  })
  await server.start()

  server.applyMiddleware({ app })

  return new Promise((resolve, reject) => {
    httpServer.listen(port).once('listening', resolve).once('error', reject)
  })
}

async function mainApp() {
  try {
    const port = Number(process.env.PORT)
    await listen(port)
    console.log('🚀 Server is ready at http://localhost:8080/graphql')
  } catch (err) {
    console.error('💀 Error starting the node server', err)
  }
}
void main()
  .then()
  .catch(console.error)
void mainApp()
