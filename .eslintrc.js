module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'class-methods-use-this': 'off',
    'import/first': 'off',
    camelcase: 'off',
    eqeqeq: 'off',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
}
