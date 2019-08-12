'use strict';
const util = require('util');

exports.assertion = function( selector, expectedText ) {
   this.message = `Testing if there are ${expectedText} elements with selector <${selector}>.`;

   this.expected = () => expectedText;

   this.pass = value => {
      return (value.filter( row => row === expectedText).length === 1) ;
   };

   this.value = result => {
      console.log(result);
      return result.map(_=>_.value);
   };

   this.command = callback => {
      return this.api.elements( 'css selector', selector, elements => {

            const promiseFactory = elements.value.map( element => {
               return new Promise( resolve => {
                  this.api.elementIdText(element.ELEMENT, resolve);
               });
            });
            let texts = [];

            Promise.all( promiseFactory).then( callback );



         })
   };
};