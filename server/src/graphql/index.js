import bodyParser from 'body-parser';
import parseGraphQLHTTP from 'parse-graphql-server';
import { graphiqlExpress } from 'graphql-server-express';
import schema from './schema';

export default {
  setup(app) {
    const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/graphql', parseGraphQLHTTP({ schema }));

    if (IS_DEVELOPMENT) {
      app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
    }
  },
};
