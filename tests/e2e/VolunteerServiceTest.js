const path = require( 'path' );
const config = require( '../../nightwatch.conf.js' );
const expect = require( 'chai-nightwatch' );

module.exports = { // adapted from: https://git.io/vodU0


   'Step 1: body visibility and title check'( browser ) {
      browser
         .url( 'http://localhost:3000/' )
         .waitForElementVisible( 'body', 1000 )
         .assert.title( 'Volunteer-Service App' )
         .waitForElementVisible( '#titleID', 1000 )
         .assert.containsText( '#titleID', 'Welcome to the Volunteer-Service App!' )
         .waitForElementVisible( '#loadButton1', 1000 )
         .assert.containsText(
            '#loadButton1',
            'Click the button to show the current volunteers availability'
         )
         .waitForElementVisible( '#myTable', 1000 )
         .waitForElementVisible( '#h7', 1000 )
         .assert.containsText( '#h7', 'Add Volunteer:' )
         .waitForElementVisible( '#pickButton', 1000 )
         .waitForElementVisible( '#loadButton2', 1000 )
         .waitForElementVisible( '#myLastReviewersTable', 1000 )
         .saveScreenshot( path.join( config.SCREENSHOT_PATH, 'BodyVisibility.png' ) )
         .end();
   },

   'Step 2: load tables and close alert'( browser ) {
      browser
         .url( 'http://localhost:3000/' )
         .waitForElementVisible( 'body', 1000 )
         .waitForElementVisible( '#loadButton1', 1000 )
         .waitForElementVisible( '#pickButton', 1000 )
         .click( '#loadButton1' )
         .waitForElementVisible( '#deleteButton2' )
         .click( '#pickButton' )
         .pause( 1000 )
         .acceptAlert()
         .click( '#loadButton2' )
         .saveScreenshot( path.join( config.SCREENSHOT_PATH, 'LoadTable.png' ) )
         .end();
   },

   'Step 3: delete user'( browser ) {
      browser
         .url( 'http://localhost:3000/' )
         .waitForElementVisible( 'body', 1000 )
         .waitForElementVisible( '#loadButton1', 1000 )
         .click( '#loadButton1' )
         .waitForElementVisible( '#deleteButton2' )
         .click( '#deleteButton2' )
         .pause( 1000 )
         .acceptAlert()
         .click( '#loadButton1' )
         .saveScreenshot( path.join( config.SCREENSHOT_PATH, 'DeleteUser.png' ) )
         .end();
   },

   'Step 4: change availability'( browser ) {
      browser
         .url( 'http://localhost:3000/' )
         .waitForElementVisible( 'body', 1000 )
         .waitForElementVisible( '#loadButton1', 1000 )
         .click( '#loadButton1' )
         .waitForElementVisible( '#toggleButton' )
         .click( '#toggleButton' )
         .acceptAlert()
         .click( '#toggleButton' )
         .pause( 1000 )
         .acceptAlert()
         .saveScreenshot( path.join( config.SCREENSHOT_PATH, 'ToggleUser.png' ) )
         .end();
   },

   'Step 5: submit a frontend volunteer'( browser ) {
      browser
         .url( 'http://localhost:3000/' )
         .waitForElementVisible( 'body', 1000 )
         .waitForElementVisible( '#loadButton1', 1000 )
         .click( '#loadButton1' )
         .waitForElementVisible( '#submitButtonVolunteer', 1000 )
         .refresh()
         .setValue( '#volunteerName', 'FrontTest' )
         .click( '#f1' )
         .click( '#submitButtonVolunteer' )
         .pause( 1000 )
         .acceptAlert()
         .click( '#loadButton1' )
         .assert.containsText( '#frontEndCell', 'FrontTest' )
         .saveScreenshot( path.join( config.SCREENSHOT_PATH, 'AddFrontendUser.png' ) )
         .end();
   },

   'Step 6: submit a backend volunteer'( browser ) {
      browser
         .url( 'http://localhost:3000/' )
         .waitForElementVisible( 'body', 1000 )
         .waitForElementVisible( '#loadButton1', 1000 )
         .click( '#loadButton1' )
         .waitForElementVisible( '#submitButtonVolunteer', 1000 )
         .refresh()
         .setValue( '#volunteerName', 'BackTest' )
         .click( '#b1' )
         .click( '#submitButtonVolunteer' )
         .pause( 1000 )
         .acceptAlert()
         .click( '#loadButton1' )
         .assert.containsText( '#backEndCell', 'BackTest' )
         .saveScreenshot( path.join( config.SCREENSHOT_PATH, 'AddBackendUser.png' ) )
         .end();
   },

   'Step 5: submit frontend and backend volunteer'( browser ) {
      browser
         .url( 'http://localhost:3000/' )
         .waitForElementVisible( 'body', 1000 )
         .waitForElementVisible( '#loadButton1', 1000 )
         .click( '#loadButton1' )
         .waitForElementVisible( '#submitButtonVolunteer', 1000 )
         .refresh()
         .setValue( '#volunteerName', 'FrontBackTest' )
         .click( '#b1' )
         .click( '#f1' )
         .click( '#submitButtonVolunteer' )
         .pause( 1000 )
         .acceptAlert()
         .click( '#loadButton1' )
         .assert.assertText( '#frontEndCell', 'FrontBackTest' )
         .saveScreenshot( path.join( config.SCREENSHOT_PATH, 'AddBackendUser.png' ) )
         .end();
   }
};

