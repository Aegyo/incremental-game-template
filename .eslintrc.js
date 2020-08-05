module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"

    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {

        indent: ['error', 4],
        'prefer-template': 'warn',
        'space-before-blocks': 'error',
        '@typescript-eslint/no-empty-function': ["warn"],
        '@typescript-eslint/type-annotation-spacing': 'error',
        // note you must disable the base rule as it can report incorrect errors
        "brace-style": "off",
        "@typescript-eslint/brace-style": ["error"],
        'func-call-spacing': "off",
        "@typescript-eslint/func-call-spacing": ["error"],
        "comma-spacing": "off",
        "@typescript-eslint/comma-spacing": ["error"],
        "keyword-spacing": "off",
        "@typescript-eslint/keyword-spacing": ["error"],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["warn"],
        "no-extra-semi": "off",
        "@typescript-eslint/no-extra-semi": ["error"],
        "no-extra-parens": "off",
        "@typescript-eslint/no-extra-parens": ["error"],
    },
};
