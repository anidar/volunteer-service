'use strict';

const modulePaths = [
   './user',
   './propose',
];

module.exports = modulePaths.map(modulePath => require(modulePath));
