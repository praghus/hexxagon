module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/errors',
        'plugin:import/warnings'
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'import'],
    settings: {
        'import/resolver': {
            alias: true,
            node: {
                extensions: ['.js', '.json', '.ts', '.tsx']
            },
            typescript: {
                alwaysTryTypes: true
            }
        },
        'import/ignore': 'react-navigation'
    },
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index', 'object', 'type']],
                'newlines-between': 'always'
            }
        ]
    }
}
