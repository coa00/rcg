#!/usr/bin/env node
"use strict";

const meow = require("meow");
const rcg = require("./lib");

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

rcg(cli.input[0], cli.flags);
