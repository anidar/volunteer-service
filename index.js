'use strict';
/* eslint-disable-next-line no-unused-vars */
const env = require( 'env2' )( './env.json' );
const http = require( 'http' );
const log4js = require( 'log4js' );


module.exports = { main };

if( require.main === module ) {
   main();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function main() {
   const logger = log4js.getLogger();
   logger.level = 'debug';

   const appGenerator = require( './app' );
   const app = appGenerator( logger );

   const port = normalizePort( process.env.PORT );
   logger.info(port);
   app.set( 'port', port );
   const server = http.createServer( app );

   server.on( 'error', onError );
   server.on( 'listening', onListening );

   server.listen( port );

   function normalizePort( val ) {
      const unnormalizedPort = parseInt( val, 10 );

      if( isNaN( unnormalizedPort ) ) {
         return val;
      }

      if( unnormalizedPort >= 0 ) {
         return unnormalizedPort;
      }

      return false;
   }

   function onError( error ) {
      if( error.syscall !== 'listen' ) {
         throw error;
      }

      const bind = typeof port === 'string' ?
         'Pipe ' + port :
         'Port ' + port;

      // handle specific listen errors with friendly messages
      switch( error.code ) {
         case 'EADDRINUSE':
            logger.error( bind + ' is already in use' );
            process.exit( 1 );
            break;
         default:
            throw error;
      }
   }

   function onListening() {
      const addr = server.address();
      const bind = typeof addr === 'string' ?
         'pipe ' + addr :
         'port ' + addr.port;
      logger.info( 'Listening on ' + bind );
   }

}
