
module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        }
    },
    extends: [
        'airbnb-base',
        'plugin:react/recommended',
    ],
    globals: {
        test: true,

    },
    plugins: [
        'react'
    ],
    env: {
        browser: true,
    },
    rules: {
        'linebreak-style': 0,
    }
};