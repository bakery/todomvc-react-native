import Parse from 'parse/node';

const buildOptions = (options, sessionToken) => {
  return Object.assign(options || {}, { sessionToken });
};

class AuthenticationFactory {
  constructor(sessionToken, currentUser) {
    this.sessionToken = sessionToken;
    this.currentUser = currentUser;
  }

  create(ParseObject) {
    if (!this.sessionToken || !this.currentUser) {
      return ParseObject;
    }

    const sessionToken = this.sessionToken;
    const currentUser = this.currentUser;

    return ParseObject.extend({
      save(target, options) {
        if (this.isNew()) {
          this.setACL(new Parse.ACL(currentUser));
        }

        return ParseObject.prototype.save.call(this, target, buildOptions(options, sessionToken));
      },

      saveAll(list, options) {
        return ParseObject.prototype.saveAll.call(this, list, buildOptions(options, sessionToken));
      },

      destroy(options) {
        return ParseObject.prototype.destroy.call(this, buildOptions(options, sessionToken));
      },

      destroyAll(list, options) {
        return ParseObject.prototype.destroyAll.call(this, list, buildOptions(options, sessionToken));
      },

      fetch(options) {
        return ParseObject.prototype.fetch.call(this, buildOptions(options, sessionToken));
      }
    });
  }
}


export default AuthenticationFactory;
