var path = require('path');
var config = require('../../nightwatch.conf.js');
var expect = require('chai-nightwatch');

module.exports = { // adapted from: https://git.io/vodU0


   'Step 1: body visibility and title check': function(browser) {
      browser
         .url('http://localhost:3000/')
         .waitForElementVisible('body', 1000)
         .assert.title('Volunteer-Service App')
         .waitForElementVisible('#titleID', 1000)
         .assert.containsText( '#titleID', 'Welcome to the Volunteer-Service App!' )
         .waitForElementVisible('#loadButton1', 1000)
         //.expect.element('#b1').to.be.a('button')
         .assert.containsText( '#loadButton1', 'Click the button to show the current volunteers availability' )
         .waitForElementVisible('#myTable', 1000)
         .waitForElementVisible('#h2', 1000)
         .assert.containsText( '#h2', 'Add Frontend Volunteer:' )
         .waitForElementVisible('#submitButtonFront', 1000)
         .waitForElementVisible('#h3', 1000)
         .assert.containsText( '#h3', 'Add Backend Volunteer:' )
         .waitForElementVisible('#submitButtonBack', 1000)
         .waitForElementVisible('#pickButton', 1000)
         .waitForElementVisible('#loadButton2', 1000)
         .waitForElementVisible('#myLastReviewersTable', 1000)
         .waitForElementVisible('#frontendName', 1000)
         .waitForElementVisible('#backendName', 1000)
         //.click('#b1')
         .saveScreenshot(path.join(config.SCREENSHOT_PATH, 'BodyVisibility.png'))
         .end();
   },

   'Step 2: load tables and close alert': function(browser) {
      browser
         .url('http://localhost:3000/')
         .waitForElementVisible('body', 1000)
         .waitForElementVisible('#loadButton1',1000)
         .waitForElementVisible('#pickButton',1000)
         .click('#loadButton1')
         .waitForElementVisible('#deleteButton2')
         .click('#pickButton')
         .pause(1000)
         .acceptAlert()
         .click('#loadButton2')
         .saveScreenshot(path.join(config.SCREENSHOT_PATH, 'LoadTable.png'))
         .end();
   },

   //always deletes the first element in the table because the ids are not unique
   'Step 3: delete user': function(browser) {
      browser
         .url('http://localhost:3000/')
         .waitForElementVisible('body', 1000)
         .waitForElementVisible('#loadButton1',1000)
         .click('#loadButton1')
         .waitForElementVisible('#deleteButton2')
         .click('#deleteButton2')
         .pause(1000)
         .acceptAlert()
         .click('#loadButton1')
         .saveScreenshot(path.join(config.SCREENSHOT_PATH, 'DeleteUser.png'))
         .end();
   },

   'Step 4: change availability': function(browser) {
      browser
         .url('http://localhost:3000/')
         .waitForElementVisible('body', 1000)
         .waitForElementVisible('#loadButton1',1000)
         .click('#loadButton1')
         .pause(1000)
         .waitForElementVisible('#toggleButton')
         .click('#toggleButton')
         .pause(1000)
         .acceptAlert()
         .pause(1000)
         .click('#toggleButton')
         .pause(1000)
         .acceptAlert()
         .pause(1000)
         .saveScreenshot(path.join(config.SCREENSHOT_PATH, 'ToggleUser.png'))
         .end();
   },

   'Step 5: submit a frontend volunteer': function(browser) {
      browser
         .url('http://localhost:3000/')
         .waitForElementVisible('body', 1000)
         .waitForElementVisible('#loadButton1',1000)
         .click('#loadButton1')
         .pause(1000)
         .waitForElementVisible('#submitButtonBack',1000)
         .refresh()
         .setValue('#frontendName','FrontTest')
         .pause(1000)
         .click('#submitButtonFront')
         .pause(1000)
         .acceptAlert()
         .pause(1000)
         .click('#loadButton1')
         .pause(1000)
         .saveScreenshot(path.join(config.SCREENSHOT_PATH, 'AddFrontendUser.png'))
         .end();
   },

   'Step 5: submit a backend volunteer': function(browser) {
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
         .saveScreenshot(path.join(config.SCREENSHOT_PATH, 'AddBackendUser.png'))
         .end();
   }

};

