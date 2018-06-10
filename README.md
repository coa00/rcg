# template-code-gen

code generate from your template file.


## install

```
npm i rcg -D
```

## usage

```
rcg name templatePath
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



### props (csv)

props

### prefix (string)

prefix

#### dest (string)

output directory path

## package.json


#### root template path

```json
  "tcg": {
    "templates": "./templates/"
  },
```