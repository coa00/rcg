module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },

    "extends": [
      "prettier",
      "prettier/flowtype",
      "prettier/react",
      "prettier/standard",
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "parserOptions": {
        "jsx": true,
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};