/**
 * @fileoverview Prevents usage of undefined keys on global.env.
 * @author Jordan Gensler
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Prevents usage of undefined keys on global.env.",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {
      var validAccess = ['current', 'production', 'development', 'is'];
      // console.log(scope);
      return {
        MemberExpression(node) {
          var scope = context.getScope();
          var boundEnv = scope.variables.find(variable => {
            return variable.name === 'env';
          });
          var boundGlobal = scope.variables.find(variable => {
            return variable.name === 'global';
          });

          var o = node.object;
          // Handle both env and global.env access:
          if (
            (o.name === 'env' && !boundEnv) ||
            (o.object && o.object.name === 'global' && o.property.name === 'env' && !boundGlobal)
          ) {
            // See if we're accessing a valid property:
            if (validAccess.indexOf(node.property.name) === -1) {
              context.report({
                node: node.property,
                message: "'{{name}}' is not a valid property on global.env.",
                data: node.property,
              });
            }
          }
        }
      };
    }
};
