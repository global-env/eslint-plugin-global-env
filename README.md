# eslint-plugin-global-env

ESLint rules for global.env usage.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm install eslint eslint-plugin-global-env --save-dev
```

> If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-global-env` globally.

## Usage

Add `global-env` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["global-env"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "global-env/no-unknown-keys": 2
  }
}
```

## Supported Rules

* Fill in provided rules here
