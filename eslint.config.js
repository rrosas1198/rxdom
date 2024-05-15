const { antfu: factory, sortTsconfig: _sortTsconfig } = require("@antfu/eslint-config");

const SortTsConfig = _sortTsconfig()[0];
const SortTsConfigRules = (SortTsConfig?.rules?.["jsonc/sort-keys"] || []);

module.exports = factory({
    stylistic: {
        semi: true,
        indent: 4,
        quotes: "double",
        overrides: {
            "curly": "off",
            // "no-console": "off",
            "dot-notation": "off",
            "no-unused-vars": "off",
            "no-extra-boolean-cast": "off",
            "antfu/if-newline": "off",
            "style/arrow-parens": ["warn", "as-needed"],
            "style/brace-style": ["warn", "1tbs"],
            "style/comma-dangle": ["error", "never"],
            "style/indent": ["error", 4, {
                SwitchCase: 1,
                ignoredNodes: [
                    `FunctionExpression > .params[decorators.length > 0]`,
                    `FunctionExpression > .params > :matches(Decorator, :not(:first-child))`,
                    `ClassBody.body > PropertyDefinition[decorators.length > 0] > .key`
                ]
            }],
            "style/semi": ["error", "always"],
            "style/no-tabs": "off",
            "ts/no-use-before-define": "off",
            "ts/consistent-type-imports": "off",
            "ts/naming-convention": ["error", {
                selector: ["interface"],
                format: ["StrictPascalCase"],
                prefix: ["I"]
            }]
        }
    }
}, [
    {
        name: "antfu:sort-tsconfig",
        files: ["**/tsconfig.json", "**/tsconfig.*.json"],
        rules: {
            "jsonc/sort-keys": ["error", {
                pathPattern: "^$",
                order: [
                    "extends",
                    "include",
                    "exclude",
                    "compilerOptions",
                    "references",
                    "files"
                ]
            }, SortTsConfigRules[2]]
        }
    }
]);
