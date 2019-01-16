const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const resolvers = require('./src/resolvers')


const server = new GraphQLServer({
  typeDefs: 'schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'generated-schema.graphql',
      endpoint: 'http://192.168.99.100:4466'
    })
  })
})

const options = {
// playground: null, // Dissable playground endpoint,
}

server.express.get(server.options.endpoint + 'user', (req, res, done) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    message: 'Message from graphql-yoga (Express API)',
    obj: 'You can use graphql-yoga as a simple REST API'
  })
})



server.start(options, () => { console.log('Server is running on http://localhost:4000') })
