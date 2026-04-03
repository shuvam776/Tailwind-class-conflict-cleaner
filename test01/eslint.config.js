import tseslint from "typescript-eslint";
import tailwindCleaner from "tailwind-class-cleaner/eslint";

export default tseslint.config(
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],

    plugins: {
      "tailwind-cleaner": tailwindCleaner,
    },

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    rules: {
      "tailwind-cleaner/no-conflicts": "warn",
    },
  }
);