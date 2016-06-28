import graphqlHTTP from 'express-graphql';
import Parse from 'parse/node';
import schema from './schema';
import { AuthenticatedQuery } from '../models/authenticated-query';

export default {
  setup (app, graphiql = false) {
    app.use('/graphql', graphqlHTTP(request => {
      const sessionToken = request.headers.authorization;
      const baseOps = {
        schema: schema,
        graphiql,
        context: {
          Query: Parse.Query,
        }
      };

      if (!sessionToken) {
        return baseOps;
      } else {
        return new Parse.Query(Parse.Session).equalTo('sessionToken', sessionToken).first({ useMasterKey: true }).then(session => {
          return session && session.get('user').fetch();
        }, error => {
          console.error('error authenticating graphql request', error);
          return baseOps;
        }).then(user => {
          if (user) {
            return Object.assign(baseOps, {
              context: { user, sessionToken, Query: AuthenticatedQuery(sessionToken, user) }
            });
          } else {
            return baseOps;
          }
        });
      }
    }));
  }
};
