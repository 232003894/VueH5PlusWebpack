module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  {{#if_eq lintConfig "standard"}}
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  {{/if_eq}}
  {{#if_eq lintConfig "airbnb"}}
  extends: 'airbnb-base',
  {{/if_eq}}
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  "globals": {
    "plus": true,
    "alert": true,
    "CustomEvent": true,
    "localStorage": true,
    "screen": true
  },
  // add your custom rules here
  'rules': {
    {{#if_eq lintConfig "standard"}}
    "comma-spacing": 0,
      "no-unused-vars": ["off", {
      "vars": "local",
      "args": "none"
    }],
    "no-eval": "off",
    "padded-blocks": ["warn", {
      //禁止块内填充
      "blocks": "never",
      //要求类内填充
      "classes": "always",
      //禁止在 switch 语句中填充
      "switches": "never"
    }],
    "space-before-function-paren": [0, "never"],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    {{/if_eq}}
    {{#if_eq lintConfig "airbnb"}}
    'import/no-unresolved': 0,
    {{/if_eq}}
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
