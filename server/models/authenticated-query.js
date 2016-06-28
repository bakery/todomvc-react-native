import Parse from 'parse/node';

export function setup(sessionToken) {
  // This sets up an Authenticated version
  // of Parse.Query based on sessionToken
  const buildOptions = (options) => {
    const sessionData = sessionToken ? { sessionToken } : {};
    return Object.assign(options || {}, sessionData);
  };

  class AuthenticatedQuery extends Parse.Query {
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

  return AuthenticatedQuery;
}
