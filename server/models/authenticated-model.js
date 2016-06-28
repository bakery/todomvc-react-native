import Parse from 'parse/node';

const buildOptions = (options, sessionToken) => {
  return Object.assign(options || {}, { sessionToken });
};

class AuthenticationFactory {
  constructor(sessionToken, currentUser) {
    console.log('@@ Auth Factory constructor');
    this.sessionToken = sessionToken;
    this.currentUser = currentUser;
  }

  create(ParseObject) {
    console.log('@@ creating authenticated version of Object', this.sessionToken);

    if (!this.sessionToken || !this.currentUser) {
      return ParseObject;
    }

    const sessionToken = this.sessionToken;
    const currentUser = this.currentUser;

    return ParseObject.extend({
      save(target, options) {
        console.log('@@ calling patched save');

        if (this.isNew()) {
          console.log('@@ setting acl since the object is new');
          this.setACL(new Parse.ACL(currentUser));
        }

        return ParseObject.prototype.save.call(this, target, buildOptions(options, sessionToken));
      },

      saveAll(list, options) {
        return ParseObject.prototype.saveAll.call(this, list, buildOptions(options, sessionToken));
      },

      destroy(options) {
        console.log('@@ calling patched destroy');
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
