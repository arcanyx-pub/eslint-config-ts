import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export const tsNodeConfigs = [
    js.configs.recommended,
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
        },
        rules: {
            // A wee hack since @typescript-eslint doesn't officially support flat ESLint config.
            ...tsPlugin.configs["eslint-recommended"].overrides.reduce(
                (a, b) => ({ ...a.rules, ...b.rules }),
                {}
            ),

            ...tsPlugin.configs["recommended"].rules,
            ...tsPlugin.configs["recommended-requiring-type-checking"].rules,

            // Require `const` instead of `let` when the variable is never reassigned.
            "prefer-const": "error",

            // Require double-quotes rather than single-quotes.
            // Standard eslint quotes must be disabled when using Typescript version.
            quotes: "off",
            "@typescript-eslint/quotes": ["error"],

            // Require semicolons at the end of all statements.
            // Standard eslint semicolon enforcement must be disabled when using Typescript version.
            semi: "off",
            "@typescript-eslint/semi": ["error"],

            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

            // Require switch statements to cover every case or have a default case.
            "@typescript-eslint/switch-exhaustiveness-check": "error",
        },
    },
];
