module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb",
  ],
  "plugins": ["import"],
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "react/no-danger": "off",
    "import/no-extraneous-dependencies": "off",
    "arrow-parens": "off",
    "global-require": "off",
    "spaced-comment": "off",
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "ignore",
    }],
    "linebreak-style": ["error", "windows"],

    "import/no-unresolved": [2, {
      commonjs: true,
      amd: true
    }],
    "import/named": 2,
    "import/namespace": 2,
    "import/default": 2,
    "import/export": 2,
  },

  "settings": {
    "settings": {
      "import/resolver": {
        "webpack": {
          "config": "webpack.config.eslint.js"
        },
        "babel-module": {},
      }
    }
  }
};
