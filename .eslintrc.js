module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-console': 0,
    'no-underscore-dangle': 0,
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
  },
};
