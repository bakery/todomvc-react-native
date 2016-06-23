import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import Parse from 'parse/node';
import schema from './schema';

const jsonParser = bodyParser.json();

export default {
  setup (app, graphiql = false) {
    app.use('/graphql', jsonParser, graphqlHTTP(request => {
      const sessionToken = request.body && request.body.sessionToken;
      const baseOps = {
        schema: schema,
        graphiql,
        context: {}
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
              context: { user, sessionToken }
            });
          } else {
            return baseOps;
          }
        });
      }
    }));
  }
};
