#!/usr/bin/env node
"use strict";

const meow = require("meow");
const readPkg = require("read-pkg");
const readTextFile = require("read-text-file");
const log = require("loglevel");
const doT = require("doT");
// const chalk = require("chalk");
const changeCase = require("change-case");
const outputFileSync = require("output-file-sync");
const fs = require("fs");

log.setLevel("info");

const cli = meow(`
	Usage
	  $ rcg <input>

	Options
	  --template, -t  type

	Examples
	  $ rcg button -d ./atoms -t stateful --props mode  --prefix a
`, {
  flags: {
    prefix: {
      type: "string",
      alias:"p"
    },
    template: {
      type: "string",
      alias:"t"
    },
    output:{
      type: "array",
      alias:"o"
    },
    props: {
      type: "array"
    },
    dest:{
      type:"string",
      alias:"d"
    }
  }
});

function fileName(string, values){
  return string.replace(/\$\{(.*?)\}/g, function(all, key){
    return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : "";
  });
}

async function run(name, {template , prefix, props, dest }) {
  const pkg = await readPkg();

  const codeTemplate = pkg.codeTemplate;

  props = String(props).split(",");

  const templatePath = codeTemplate.templates + template;
  const configs = {
    name:{
      pascalCase:changeCase.pascalCase(name),
      paramCase: changeCase.paramCase(name)
    },
    prefix,
    props
  };

  if (fs.statSync(templatePath).isDirectory()) {

    fs.readdir(templatePath, function(err, files){
      if (err) throw err;
      files.forEach((file)=>{
        log.debug("file:", file);
        const templateSource = readTextFile.readSync(templatePath + "/" + file);
        const render = doT.template(templateSource, Object.assign(doT.templateSettings, {strip : false}));
        const code = render(configs);

        log.debug("code:", code);

        const outPutFileName = fileName(file, { name });

        log.debug("outPutFileName:", outPutFileName);

        outputFileSync(`${dest}/${name}/${outPutFileName}`, code);
      });
    });

  }else{
    const templateSource = readTextFile.readSync(templatePath);
    const render = doT.template(templateSource);
    const code = render(configs);

    log.debug("code:", code);

    const outPutFileName = fileName(template, { name });

    outputFileSync(`${dest}/${outPutFileName}`, code);
  }
}

run(cli.input[0], cli.flags).then(()=>{
  log.info("done");
});
