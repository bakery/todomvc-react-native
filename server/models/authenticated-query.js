import Parse from 'parse/node';
import AuthenticationFactory from './authenticated-model';

export function AuthenticatedQuery(sessionToken, user) {
  // This sets up an Authenticated version
  // of Parse.Query based on sessionToken
  const buildOptions = (options) => {
    const sessionData = sessionToken ? { sessionToken } : {};
    return Object.assign(options || {}, sessionData);
  };

  class Query extends Parse.Query {
    constructor(objectClass) {
      super(new AuthenticationFactory(sessionToken, user).create(objectClass));
      this.ObjectClass = new AuthenticationFactory(sessionToken, user).create(objectClass);
    }

    create(attributes = {}) {
      return new this.ObjectClass(attributes);
    }

    count(options) {
      return super.count(buildOptions(options));
    }

    find(options) {
      return super.find(buildOptions(options));
    }

    first(options) {
      return super.first(buildOptions(options));
    }

    get(objectId, options) {
      return super.get(objectId, buildOptions(options));
    }
  }

  return Query;
}
