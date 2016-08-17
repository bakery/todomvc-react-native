import schema from './schema';
import parseGraphQLHTTP from 'parse-graphql-server';

export default {
  setup(app, graphiql = false) {
    app.use('/graphql', parseGraphQLHTTP({ schema, graphiql }));
  },
};
