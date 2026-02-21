import eslint from "@eslint/js";
import tslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import globals from "globals";
import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const core = defineConfig({
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
        eslint.configs.recommended,
        ...tslint.configs.recommendedTypeChecked,
        ...tslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
        globals: { ...globals.node },
        parser: tslint.parser,
        parserOptions: {
            project: "./tsconfig.json",
        },
    },
    plugins: {
        "@typescript-eslint": tslint.plugin,
        "@stylistic": stylistic,
    },
    rules: {
        // Require `const` instead of `let` when the variable is never reassigned.
        "prefer-const": "error",

        // Require double-quotes rather than single-quotes.
        // Exception: can use single-quotes when double-quotes would need to be
        // escaped.
        "@stylistic/quotes": ["error", "double", { avoidEscape: true }],

        // Require semicolons at the end of all statements.
        "@stylistic/semi": ["error", "always"],

        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

        // Require switch statements to cover every case or have a default case.
        "@typescript-eslint/switch-exhaustiveness-check": "error",
    },
});

const patchedNextVitals = nextVitals.map(config => {
    if (config.plugins && config.plugins["@typescript-eslint"]) {
        // Force Next.js to use the exact same plugin object as rcnxEslint to prevent error about
        // duplicate "@typescript-eslint" definitions.
        config.plugins["@typescript-eslint"] = tslint.plugin;
    }
    return config;
});

const coreAndNextJs = defineConfig(...patchedNextVitals, core);

export default {
    core,
    coreAndNextJs,
};
