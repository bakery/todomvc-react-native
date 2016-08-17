/* eslint no-console: "off" */

// Attempt to run actual npm run setup to make sure all the jazz gets properly bootstrapped
// - get rid of current node_modules dir
// - reinstall deps
// - run app generator
// - bundle app using React Native bundle to check if the build works

const run = require('child_process').execSync;
const packageJSON = require('../../package');
const packageName = packageJSON.name;


// XX: only try running setup tests if we are testing original
// boilerplate package (baker) and not the app built on top of it
if (packageName === 'baker') {
  console.log('removing current node_modules directory...');
  run('rm -rf node_modules');

  console.log('trying to set up project');

  console.log('installing deps...');
  run('npm install');

  console.log('running app generator...');
  // eslint-disable-next-line max-len
  const r = run('./node_modules/babel-cli/bin/babel-node.js --presets es2015 ./baker/generate.js app TestApplication --server');
  console.log(r.toString());
} else {
  console.log('skipping setup tests since this is the app based on baker');
}

console.log('building for iOS...');
run('react-native bundle --entry-file index.ios.js --platform ios --bundle-output ./bundle.ios.js');

console.log('building for Android...');
// eslint-disable-next-line max-len
run('react-native bundle --entry-file index.android.js --platform android --bundle-output ./bundle.android.js');
