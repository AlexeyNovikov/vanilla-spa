module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-plusplus': 'off',
    'class-methods-use-this': 'off',
    'no-bitwise': 'off',
  },
  overrides: [
    {
      files: ['src/server/**/*.js', 'src/server/*.js'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
  env: {
    browser: true,
    node: true,
  },
  globals: {
    ENV: true,
  },
}
