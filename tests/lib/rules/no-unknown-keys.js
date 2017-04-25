/**
 * @fileoverview Prevents usage of undefined keys on global.env.
 * @author Jordan Gensler
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-unknown-keys");
var RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-unknown-keys", rule, {
  valid: [
    "global.env.current",
    "global.env.production",
    "global.env.development",
    "global.env.is('test')",
    "env.current",
    "env.production",
    "env.development",
    "env.is('test')",
    `
      var env = {};
      env.hello;
    `.trim(),
    `
      var global = { env: {} };
      global.env.hello;
    `.trim(),
    `
      var another = { global: { env: {} } };
      another.global.env.hello;
    `.trim(),
  ],

  invalid: [
    {
      code: "global.env.test",
      errors: [{
        message: "'test' is not a valid property on global.env.",
        type: "Identifier"
      }]
    },
    {
      code: "env.test",
      errors: [{
          message: "'test' is not a valid property on global.env.",
          type: "Identifier"
      }]
    }
  ]
});
