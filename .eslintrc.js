const { config } = require('@dhis2/cli-style')

module.exports = {
    extends: [config.eslintReact],
    globals: {
        cy: 'readonly',
    },
    rules: {
        'import/extensions': [2, 'ignorePackages'],
    },
}
