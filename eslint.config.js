import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "marco.mcp/dist/**",
      "agents/mcp/**",
      "runtime/**",
      "coverage/**",
      "atribucion/sdk/js/**",
      "pva/fsdbg/**",
      "pva/iwc/**",
      "projects/**",
      "web/CIUDAD/**",
      "docs/CIUDAD/**",
      "ciudad/**",
      "docs/ciudad/**",
      "docs/catalogo/**",
      "**/sw.js",
      "**/*.min.js"
    ]
  },
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.es2022 },
      ecmaVersion: 2022,
      sourceType: "module"
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_", "caughtErrorsIgnorePattern": "^_" }],
      "no-empty": "warn",
      "no-undef": "off",
      "object-shorthand": "off",
      "curly": "off",
      "quotes": "off",
      "prefer-const": "off",
      "no-var": "off",
      "arrow-body-style": "off"
    }
  }
];
