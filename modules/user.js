'use strict';
const convertRowToUser = require('./convertRowToUser');

const runSql = require('./runSql');
module.exports = setup;

function setup(app, logger) {
   logger.debug(' Setting up /user endpoint');
   app.get('/api/user', async (req, res)=>{

      const user = await getUser( logger );
      logger.debug(user);
      res.send(user);
   });
}
async function getUser(logger) {
   const results = (await runSql('SELECT * FROM PERSONS', logger))[0].message;
   const metaData = results.metaData;
   return {
      'users': results.rows.map( row => convertRowToUser( metaData, row ) )
   };
}

