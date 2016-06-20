import LokkaTransport from 'lokka/transport';
import Parse from 'parse/react-native';

const {
  Promise: ParsePromise,
} = Parse;

export class Transport extends LokkaTransport {
  send(query, variables, operationName) {
    console.log('running on parse transport', arguments);

    const result = new ParsePromise();
    const payload = {query, variables, operationName};

    Parse.Cloud.run('gql', payload).then(({data, errors}) => {
      if (errors) {
        const message = errors[0].message;
        const error = new Error(`GraphQL Error: ${message}`);
        error.rawError = errors;

        throw error;
      }
      //return data;
      result.resolve(data);
    });

    return result;
  }
}

export default Transport;
