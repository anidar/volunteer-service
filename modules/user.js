'use strict';
const convertRowToUser = require('./convertRowToUser');
const bodyParser = require('body-parser');
const runSql = require('./runSql');
require('env2')('env.json');


module.exports = setup;

function setup(app, logger) {
   logger.debug(' Setting up /user endpoint');
   app.get('/api/user', async (req, res)=>{
      const user = await getUser( logger );
      logger.debug(user);
      res.send(user);
   });

   app.delete('/api/user/delete', bodyParser.json(), async (req, res) => {
      logger.error('test3');
      const body = req.body;
      //get the list of all users from data base and check if the user to be deleted is already there
      const userIsThere = await calculateUsers(body.users, logger);
      console.log(userIsThere);
      //if user is there - delete, otherwise - do nothing
      if(userIsThere.length!==0){
         //updateUser
         console.log("user exists --> deleting...");
         Object.keys(userIsThere)
            .forEach(async key =>
               await runSql(`DELETE FROM PERSONS WHERE Name = ('${(userIsThere[key].name)}')`, logger));

      } else {
         //do nothing
         console.log("user is not in the list");
      }
      res.json(body.users);
   });


   app.post('/api/user', bodyParser.json(), async (req, res) => {
      logger.error('test2');
      const body = req.body;

      //get the list of all users from data base and check if the user to be updated is already there
      const userIsThere = await calculateUsers(body.users, logger);
      console.log(userIsThere);

      //if user is there - update, otherwise - add
      if(userIsThere.length!==0){
         //updateUser
         console.log("user already exists --> updating...");
         Object.keys(userIsThere)
            .forEach(async key =>
               await runSql(`UPDATE PERSONS SET backend = ('${userIsThere[key].backend}'), frontend = ('${(userIsThere[key].frontend)}') WHERE Name = ('${(userIsThere[key].name)}')`, logger));

      } else {
         //insertNewUser
         Object.keys(body.users)
            .forEach(async key =>
               await runSql(`INSERT INTO PERSONS VALUES ('${(body.users[key].name)}','${(body.users[key].backend)}','${(body.users[key].frontend)}')`, logger));
      }
      res.json(body.users);
   });
}

async function calculateUsers(allUsers, logger){ //allUsers=body.users - object
   const users = (await getUser(logger)).users.map(user => user.name);
   return allUsers.filter(user => users.includes(user.name));
}

async function getUser(logger) {
   const results = (await runSql('SELECT * FROM PERSONS', logger))[0].message;
   const metaData = results.metaData;
   return {
      'users': results.rows.map( row => convertRowToUser( metaData, row ) )
   };
}

