# Getting started

```sh
git clone https://github.com/thebakeryio/baker.git Todos
cd Todos && npm install && npm run setup 
```

ran setup -> asked to provide name for the app
got basic structure in place -> show app tree


confirm that the app works

```sh
npm run ios
```

show blank screen

# Adding navigation

show the process of using a generator with navigation boilerplate

# Plug in navigation in components/App/index.js

```javascript
import { View, Text } from 'react-native';
import React, { Component } from 'react';
import styles from './styles';
import MainNavigation from '../MainNavigation';

class App extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <MainNavigation />
      </View>
    );
  }
}

export default App;
```

see what the app looks like now: see plugged in tabs, still not much going on
let's rename tabs so they make more sense for the app 
head to app/components/MainNavigation/reducer.js

Update tan definitions (also add relevant images to app/components/MainNavigation/images/)

```javascript
const tabsDefinitions = [
  { key: 'all', icon: require('./images/all.png'), title: 'All' },
  { key: 'active', icon: require('./images/active.png'), title: 'Active' },
  { key: 'completed', icon: require('./images/completed.png'), title: 'Completed' }
];
```

See what the screen looks like - got nice icons and titles. Still no content

# Add TodosList

Create a generic todo list compoment - generate component called TodoList 


