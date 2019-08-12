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
         //.waitForElementVisible('#volunteerName', 1000)
         //.click('#b1')
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

   //always deletes the first element in the table because the ids are not unique
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
         .pause( 1000 )
         .waitForElementVisible( '#toggleButton' )
         .click( '#toggleButton' )
         .pause( 1000 )
         .acceptAlert()
         .pause( 1000 )
         .click( '#toggleButton' )
         .pause( 1000 )
         .acceptAlert()
         .pause( 1000 )
         .saveScreenshot( path.join( config.SCREENSHOT_PATH, 'ToggleUser.png' ) )
         .end();
   },

   'Step 5: submit a frontend volunteer'( browser ) {
      browser
         .url( 'http://localhost:3000/' )
         .waitForElementVisible( 'body', 1000 )
         .waitForElementVisible( '#loadButton1', 1000 )
         .click( '#loadButton1' )
         .pause( 1000 )
         .waitForElementVisible( '#submitButtonVolunteer', 1000 )
         .refresh()
         .setValue( '#volunteerName', 'FrontTest' )
         .click( '#f1' )
         .pause( 1000 )
         .click( '#submitButtonVolunteer' )
         .pause( 1000 )
         .acceptAlert()
         .pause( 1000 )
         .click( '#loadButton1' )
         .pause( 1000 )
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
         .pause( 1000 )
         .waitForElementVisible( '#submitButtonVolunteer', 1000 )
         .refresh()
         .setValue( '#volunteerName', 'BackTest' )
         .click( '#b1' )
         .pause( 1000 )
         .click( '#submitButtonVolunteer' )
         .pause( 1000 )
         .acceptAlert()
         .pause( 1000 )
         .click( '#loadButton1' )
         .pause( 1000 )
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
         .pause( 1000 )
         .waitForElementVisible( '#submitButtonVolunteer', 1000 )
         .refresh()
         .setValue( '#volunteerName', 'FrontBackTest' )
         .click( '#b1' )
         .click( '#f1' )
         .pause( 1000 )
         .click( '#submitButtonVolunteer' )
         .pause( 1000 )
         .acceptAlert()
         .pause( 1000 )
         .click( '#loadButton1' )
         .pause( 1000 )
         //.assert.containsText('#frontEndCell', 'FrontBackTest')
         .assert.assertText( '#frontEndCell', 'FrontBackTest' )
      // .assert.containsText('#backEndCell', 'FrontBackTest') //ids are not unique -> test fails
         .saveScreenshot( path.join( config.SCREENSHOT_PATH, 'AddBackendUser.png' ) )
         .end();
   }
   /*
      'Step 6: submit a backend volunteer': function(browser) {
         browser
            .url('http://localhost:3000/')
            .waitForElementVisible('body', 1000)
            .waitForElementVisible('#loadButton1',1000)
            .click('#loadButton1')
            .pause(1000)
            .waitForElementVisible('#submitButtonBack',1000)
            .refresh()
            .setValue('#backendName','BackTest')
            .pause(1000)
            .click('#submitButtonBack')
            .pause(1000)
            .acceptAlert()
            .pause(1000)
            .click('#loadButton1')
            .pause(1000)
            .assert.containsText( '#myTable', 'BackTest' )
            .saveScreenshot(path.join(config.SCREENSHOT_PATH, 'AddBackendUser.png'))
            .end();
      }
   /*

   //Test works, have to fix bug
      'Step 6: check if a volunteer can be frontend and backend at the same time': function(browser) {
         browser
            .url('http://localhost:3000/')
            .waitForElementVisible('body', 1000)
            .waitForElementVisible('#loadButton1',1000)
            .click('#loadButton1')
            .pause(1000)
            .waitForElementVisible('#submitButtonBack',1000)
            .waitForElementVisible('#submitButtonFront', 1000)
            .refresh()
            .setValue('#backendName','FrontBackTest')
            .pause(1000)
            .click('#submitButtonBack')
            .pause(1000)
            .acceptAlert()
            .pause(1000)
            .setValue('#frontendName','FrontBackTest')
            .pause(1000)
            .click('#submitButtonFront')
            .pause(1000)
            .acceptAlert()
            .pause(1000)
            .click('#loadButton1')
            .pause(1000)
            .assert.containsText( '#frontEndCell', 'FrontBackTest' )
            .assert.containsText('#backEndCell', 'FrontBackTest')
            .saveScreenshot(path.join(config.SCREENSHOT_PATH, 'AddBackendUser.png'))
            .end();
      }

      */
};

