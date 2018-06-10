#!/usr/bin/env node
"use strict";

const meow = require("meow");
const tcg = require("./lib");
const readPkg = require("read-pkg");

const cli = meow(`
	Usage
	  $ template-code-gen <name>

	Options
	  --template or -t template path
	  --prefix or -p prefix
	  --props ex. --props name,content
	  --dest or -d output directory
	  --destDirName ex. ${name.paramCase}

	Examples
	  $ template-code-gen button ./stateful -d ./atoms  --props mode  --prefix a
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
    },
    destDirName:{
      type:"string",
    },
    debug:{
      type:"boolean",
    }
  }
});

const pkg = readPkg.sync(process.cwd());

tcg(cli.input[0],cli.input[1], pkg, cli.flags);
