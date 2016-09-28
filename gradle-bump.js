#!/usr/bin/env node

var fs = require('fs');
var gradleFileLocation = './app/android/app/build.gradle';
var versionCodeRx = /(versionCode) ([0-9]+)/ig;
var gradleConfigContent = fs.readFileSync(gradleFileLocation).toString();
var currentVersionCode = parseInt(versionCodeRx.exec(gradleConfigContent)[2], 10);

fs.writeFileSync(gradleFileLocation,
  gradleConfigContent.replace(versionCodeRx, '$1 ' + (currentVersionCode + 1))
);
