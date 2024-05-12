import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs", } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    "env": {
      "node": true
    },
    "rules": {
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'no-console': 0,
    }
  }
];