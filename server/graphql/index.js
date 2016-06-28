import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import Parse from 'parse/node';
import schema from './schema';
import { setup as setupAuthQuery } from '../models/authenticated-query';

const jsonParser = bodyParser.json();

export default {
  setup (app, graphiql = false) {
    app.use('/graphql', jsonParser, graphqlHTTP(request => {
      const sessionToken = request.body && request.body.sessionToken;
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
              context: { user, sessionToken, Query: setupAuthQuery(sessionToken) }
            });
          } else {
            return baseOps;
          }
        });
      }
    }));
  }
};
