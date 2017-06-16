
module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'airbnb-base',
        'plugin:react/recommended',
    ],
    globals: {
        test: true,
        expect: true,
        describe: true,
        it: true
    },
    plugins: [
        'react'
    ],
    env: {
        browser: true,
    },
    rules: {
        'linebreak-style': 0,
        'class-methods-use-this': 0,
        'experimental-decorators': 0,
        'react/no-find-dom-node': 0,
    }
};