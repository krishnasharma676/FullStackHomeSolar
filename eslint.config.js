import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  // 1) Ignore build output and deps
  { ignores: ["dist", "node_modules"] },

  // 2) Backend — all .js under /backend, treated as ESM
  {
    files: ["backend/**/*.js"],
    languageOptions: {
      globals: globals.node, // Node.js globals (process, Buffer, etc.)
      parserOptions: {
        ecmaVersion: 2022, // modern JS syntax
        sourceType: "module", // enable import/export
      },
    },
    rules: {
      ...js.configs.recommended.rules, // standard ESLint rules for Node.js
    },
  },

  // 3) Frontend — any .js/.jsx, treated as ESM with JSX
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
