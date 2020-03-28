module.exports = {
  parser: 'babel-eslint',
  plugins: ['jsx-a11y', 'prettier'],
  env: {
    browser: true, // allows browser variables, e.g. "document.xxx"
    jest: true, // fixes no-def and other jest env errors in test files
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'max-len': [
      'error',
      {
        code: 100,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      },
    ],
    'lines-between-class-members': ['error', 'always'],
    'no-warning-comments': 'warn',
    'valid-jsdoc': [
      'error',
      {
        prefer: { return: 'returns' },
        requireReturn: false, // Note: only requires if method returns something.
      },
    ],
    'lines-around-comment': [
      'error',
      {
        beforeLineComment: true,
        allowBlockStart: true,
        allowObjectStart: true,
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'const', next: 'export' },
      {
        blankLine: 'always',
        prev: '*',
        next: ['block', 'block-like', 'function', 'multiline-block-like', 'multiline-expression'],
      },
      {
        blankLine: 'always',
        prev: ['block', 'block-like', 'function', 'multiline-block-like', 'multiline-expression'],
        next: '*',
      },
    ],
    'no-console': 'warn',
    'object-curly-newline': ['error', { consistent: true }],
    'import/no-unresolved': ['error'],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    'import/prefer-default-export': [0],
    'react/jsx-props-no-spreading': [0]
  },
};
