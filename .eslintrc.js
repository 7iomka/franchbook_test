module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb",
  ],
  "plugins": ["import"],
  "env": {
    "browser": true,
    "node": true,
    // "commonjs": true,
    "es6": true,
    "jquery": true
  },
  "rules": {
    // "react/no-danger": "off",
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
    // "linebreak-style": ["error", "windows"],
    // "linebreak-style": 0,
    "import/no-unresolved": [2, {
      commonjs: true,
      amd: true
    }],
    "import/named": 2,
    "import/namespace": 2,
    "import/default": 2,
    "import/export": 2,
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }],

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
