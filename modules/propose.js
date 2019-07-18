'use strict';

const bodyParser = require('body-parser');
const random = require('random');
const runSQL = require('./runSql');
const convertRowToUser = require('./convertRowToUser');
require('env2')('env.json');

module.exports = setup;

function setup(app, logger) {
   logger.debug(' Setting up /propose endpoint');

   app.get('/api/propose', bodyParser.json(), async (req, res) => {
      logger.error('test');
      res.json({'backendReviewer':'hdk'})
   });

   app.post('/api/propose', bodyParser.json(), async (req, res) => {
      logger.error('test');
      const body = req.body;
      const requiredReviewerNumbers = getRequiredReviewerNumbers(body.users);

      const hasEnoughReviewers = Object.keys(requiredReviewerNumbers)
         .map(key => requiredReviewerNumbers[key])
         .every(number => number === 0);

      if(hasEnoughReviewers){
         const users = await calculateUsers(body.users, logger);
         const reviewers = pickReviewers(users);
         await updatePreviousReviewers(reviewers, logger);
         res.json(reviewers);
      } else {
         requiredReviewerNumbers.message = "Not enough potential reviewers";
         res.status(400).json(requiredReviewerNumbers);
      }
   });
}

async function updatePreviousReviewers(reviewers, logger){
   await runSQL('DELETE FROM LastReviewers', logger);
   Object.keys(reviewers)
      .forEach(async key =>
         await runSQL(`INSERT INTO LastReviewers VALUES ('${reviewers[key]}')`, logger));
}

async function calculateUsers(allUsers, logger){
   const results = (await runSQL('SELECT * FROM LastReviewers', logger))[0].message;
   const metaData = results.metaData;
   const previousReviewers = results.rows.map( row => convertRowToUser( metaData, row ))
      .map(reviewer => reviewer.name);
   logger.error(previousReviewers);

   const users = allUsers.filter(user => !previousReviewers.includes(user.name));

   const requiredReviewerNumbers = getRequiredReviewerNumbers(users);

   const hasEnoughReviewers = Object.keys(requiredReviewerNumbers)
      .map(key => requiredReviewerNumbers[key])
      .every(number => number === 0);

   if(hasEnoughReviewers){
      return users;
   } else {
      return allUsers;
   }
}

function getRequiredReviewerNumbers( users ) {
   const numberOfPotentialBackEndReviewers = users.filter( user => user.backend === 'Y' ).length;
   const numberOfPotentialFrontEndReviewers = users.filter( user => user.frontend === 'Y' ).length;
   return {
      "missingFrontEndReviewers": numberOfPotentialFrontEndReviewers < 2 ? 2 - numberOfPotentialFrontEndReviewers : 0,
      "missingBackEndReviewers": numberOfPotentialBackEndReviewers < 2 ? 2 - numberOfPotentialBackEndReviewers : 0
   }
}


function pickReviewers( users ) {

   const reviewer = {};
   const pickFunctions = [ pickBackEndReviewer, pickFrontEndReviewer ];
   while ( pickFunctions.length ) {
      const currentFunctionIndex = random.int( 0, pickFunctions.length - 1 );
      const currentPick = pickFunctions.splice( currentFunctionIndex, 1 )[ 0 ]( users );
      reviewer[ currentPick.role ] = currentPick.user;
   }
   const fallbackPick = pickFallBackReviewer(users);
   reviewer[fallbackPick.role] = fallbackPick.user;
   Object.keys(reviewer).forEach(key => reviewer[key] = reviewer[key].name);
   return reviewer;



   function pickBackEndReviewer( users ) {
      const potentialBackendReviewers = users.filter( user => user.backend === 'Y' );
      const user = potentialBackendReviewers[ random.int( 0, potentialBackendReviewers.length - 1) ];
      const indexToDelete = users.indexOf(user);
      users.splice(indexToDelete, 1);
      return {
         "role": 'backendReviewer',
         "user": user
      };
   }


   function pickFrontEndReviewer( users ) {
      const potentialFrontendReviewers = users.filter( user => user.frontend === 'Y' );
      const user = potentialFrontendReviewers[ random.int( 0, potentialFrontendReviewers.length - 1) ];
      const indexToDelete = users.indexOf(user);
      users.splice(indexToDelete, 1);
      return {
         "role": 'frontendReviewer',
         "user": user
      };
   }


   function pickFallBackReviewer( users ) {
      const randomIndex = random.int( 0, users.length - 1);
      const user = users[randomIndex];
      users.splice(randomIndex, 1);
      return {
         "role": 'fallbackReviewer',
         "user": user
      };
   }
}