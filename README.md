# template-code-gen

[![Build Status](https://travis-ci.org/coa00/template-code-gen.svg?branch=master)](https://travis-ci.org/coa00/template-code-gen)
[![npm version](https://badge.fury.io/js/template-code-gen.svg)](https://badge.fury.io/js/template-code-gen)

code generate from your template file.

## example

template
```
import React from "react";
import PropTypes from "prop-types";
import BEMHelper from "react-bem-helper";
import "./{{=it.name.pascalCase}}.css";

const {{=it.name.pascalCase}} = ({ {{=it.props.toString()}} }) => {
  const classes = new BEMHelper({
    name: "{{=it.name.paramCase}}",
    prefix: "{{=it.prefix}}-"
  });

  return (
    <div {...classes()}>
    </div>
  );
};


{{=it.name.pascalCase}}.propTypes = {
{{~it.props :value:index}}
{{=value}}: PropTypes.any,
  {{~}}
};


export default {{=it.name.pascalCase}};
```

command

```
template-code-gen test stateless -d ./atoms --props message,button --prefix a
```

outputfile

```javascript
import React from "react";
import PropTypes from "prop-types";
import BEMHelper from "react-bem-helper";
import "./Test.css";

const Test = ({ message,button }) => {
  const classes = new BEMHelper({
    name: "test",
    prefix: "a-"
  });

  return (
    <div {...classes()}>
    </div>
  );
};


Test.propTypes = {

message: PropTypes.any,

button: PropTypes.any,

};


export default Test;
```

## install

```
npm i template-code-gen -D
```

## usage

```
template-code-gen name templatePath
```

## command option

### props (csv)

react props

### prefix (string)

prefix

#### dest (string)

output directory path

#### destDirName (string)

output directory name

## package.json

#### root template path

```json
  "tcg": {
    "templates": "./templates/"
  },
```

## template syntax

ref [ doT](http://olado.github.io/doT/)

### Built-in variables

#### paramCase name

{{=it.name.paramCase}}


coffeeCup > coffee-cup

#### pascalCase name

{{=it.name.pascalCase}}


test-case > TestCase

#### prefix

{{=it.name.pascalCase}}


test-case > TestCase


