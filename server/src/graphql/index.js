import bodyParser from 'body-parser';
import parseGraphQLHTTP from 'parse-graphql-server';
import schema from './schema';

export default {
  setup(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/graphql', parseGraphQLHTTP({ schema }));
  },
};
