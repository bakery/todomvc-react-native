import Parse from 'parse/react-native';

export function getCurrentUser() {
  return Parse.User.currentAsync().then((currentUser) => {
    if (currentUser) {
      return currentUser;
    }

    const user = new Parse.User();
    const newEmail = `todos-${Math.floor(Math.random() * 1000000)}@gmail.com`;
    user.set('username', newEmail);
    user.set('email', newEmail);
    user.set('password', 'password');

    return user.signUp(null);
  }).then(user => user, error => error);
}
