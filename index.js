module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],
    rules: {
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
        "@typescript-eslint/no-unused-vars": ["error", {"argsIgnorePattern": "^_"}],

        // Require switch statements to cover every case or have a default case.
        "@typescript-eslint/switch-exhaustiveness-check": "error",
    }
};
