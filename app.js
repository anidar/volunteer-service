'use strict';
const express = require( 'express' );
const os = require( 'os' );
const path = require( 'path' );

/**
 * @param {Function} logger log4j logger
 * @return {*|Function} express application
 */
function createApp( logger ) {

   const app = express();
   const modules = require( './modules' );
   logger.info( 'registering modules...' );
   app.use( ( req, res, next ) => {
      res.setHeader( 'Date', new Date( Date.now() ) );
      next();
   } );
   modules.forEach( module => module( app, logger ) );
   /* eslint-disable-next-line no-unused-vars */
   app.use( ( err, req, res, next ) => {
      logger.error( err.stack );
      res.status( 500 ).json( {
         'message': `Keep calm and carry on using postman-helper!
                     Also check out API docs with the link below.`,
         'api-docs': `http://${os.hostname}:${process.env.PORT}/api-docs`,
         'stack': err.stack
      } );
   } );
   return app;
}

module.exports = createApp;

