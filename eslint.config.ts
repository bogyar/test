// eslint.config.ts
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["dist", "node_modules"],

    plugins: {
      "unused-imports": eslintPluginUnusedImports,
    },

    rules: {
    "@typescript-eslint/no-explicit-any": "off",
      // 🚫 Report unused imports
      "unused-imports/no-unused-imports": "error",

      // ⚠️ Warn about unused variables
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // Disable duplicate rules
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  }
);
