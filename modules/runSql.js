'use strict';
/* eslint-disable-next-line no-unused-vars */
const env = require( 'env2' )( 'env.json' );
const oracledb = require( 'oracledb' );

module.exports = runSql;

async function runSql( sqlString, logger ) {
   let dbConnection;
   const messages = [];
   let errorClosingDbConnection;
   try {

      dbConnection = await oracledb.getConnection( {
         user: process.env.DB_USER,
         password: process.env.DB_PASSWORD,
         connectString: process.env.DB_CONNECT_STRING
      } );
      dbConnection.autoCommit = false;

      const statements =  [sqlString];
      const promiseFactory = statements.map(
         sqlStatement => async() => {
            try {
               const result = await dbConnection.execute( sqlStatement );
               logger.debug( `Executing ${sqlStatement} led to result ${JSON.stringify( result )}` );
               messages.push( { 'outcome': 'SUCCESS', 'message': result } );
            }
            catch( err ) {
               logger.error( `Error (${err}) executing SQL-statement (${sqlStatement})` );
               messages.push( { 'outcome': 'ERROR', 'message': err } );
            }
         } );
      await promiseFactory.reduce( ( p, n ) => p.then( n ), Promise.resolve() );
   }
   finally {
      if( dbConnection ) {
         try {
            await closeDbConnection( dbConnection, messages );
            errorClosingDbConnection = false;
         }
         catch( err ) {
            logger.error( 'Error closing db connection.' );
            errorClosingDbConnection = true;
         }
      }
   }
   if( errorClosingDbConnection ) {
      throw new Error( errorClosingDbConnection );
   }
   return messages;

   async function closeDbConnection( dbConnection, messages ) {
      if( dbConnection ) {
         try {
            if( messages.filter( m => m.outcome === 'ERROR' ).length !== 0 ) {
               await dbConnection.execute( 'ROLLBACK' );
            }
            await dbConnection.commit();
            await dbConnection.close();
            logger.debug( 'Connection closed successfully.' );
         }
         catch( err ) {
            logger.error( 'Error closing db connection.' );
            throw new Error( err );
         }
      }
   }
}
