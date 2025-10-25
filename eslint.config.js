import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintConfigPrettier,
    ],
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "no-duplicate-imports": "error",
      "no-console": [
        process.env.PRECOMMIT ? "error" : "warn",
        { allow: ["warn", "error"] },
      ],
      "no-debugger": process.env.PRECOMMIT ? "error" : "warn",
      "no-constant-condition": process.env.PRECOMMIT ? "error" : "warn",
      "@typescript-eslint/no-unused-vars": [
        process.env.PRECOMMIT ? "error" : "warn",
        {
          argsIgnorePattern: "^_",
          args: "after-used",
          ignoreRestSiblings: true,
        },
      ],
      "spaced-comment": ["error", "always", { block: { balanced: true } }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": process.env.PRECOMMIT ? "error" : "warn",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      "react/self-closing-comp": "error",
      "react/jsx-boolean-value": ["error", "never"],
      "react/display-name": "off",
      "react/prop-types": "off",
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
);
