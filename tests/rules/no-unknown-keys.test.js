import { RuleTester } from 'eslint';
import rule from '../../src/rules/no-unknown-keys';

new RuleTester().run('no-unknown-keys', rule, {
  valid: [
    'global.env.current',
    'global.env.production',
    'global.env.development',
    "global.env.is('test')",
    'env.current',
    'env.production',
    'env.development',
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
      code: 'global.env.test',
      errors: [{
        message: '"test" is not a valid property on global.env.',
        type: 'Identifier',
      }],
    },
    {
      code: 'env.test',
      errors: [{
        message: '"test" is not a valid property on global.env.',
        type: 'Identifier',
      }],
    },
  ],
});
