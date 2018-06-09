const readTextFile = require("read-text-file");
const log = require("loglevel");
const doT = require("doT");
const changeCase = require("change-case");
const outputFileSync = require("output-file-sync");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

log.setLevel("debug");

function getName(string, configs = {}){
  return string.replace(/\$\{(.*?)\}/g, function(all, key){
    return _.get(configs, key);
  });
}

async function run(name, template, pkg = null, { prefix = "", props="", dest = "./", destDirName }) {
  log.debug(prefix, props, dest);

  log.debug(__dirname);

  props = String(props).split(",");
  let rootTemplatePath;

  if (pkg){
    rootTemplatePath = pkg.rcg;
  }

  let outputDirName;
  let templatePath = template;

  if (template && rootTemplatePath && rootTemplatePath.templates){
    templatePath = path.join(rootTemplatePath.templates,template);
  }else if (rootTemplatePath){
    templatePath = path.join(rootTemplatePath.templates);
  }

  if (!name){
    log.error("you should set name.");
    throw("name error");
  }
  if (!templatePath){
    log.error("you should set template path. you can set template path in your package json or --template option.");
    throw("template path error");
  }

  const configs = {
    name:{
      pascalCase:changeCase.pascalCase(name),
      paramCase: changeCase.paramCase(name)
    },
    prefix,
    props
  };

  if (destDirName){
    outputDirName = getName(destDirName, configs);
  }else{
    outputDirName = getName("${name.pascalCase}", configs);
  }

  if (fs.statSync(templatePath).isDirectory()) {

    fs.readdir(templatePath, function(err, files){
      if (err) throw err;
      files.forEach((file)=>{
        log.debug("file:", file);
        const templateSource = readTextFile.readSync(templatePath + "/" + file);
        const render = doT.template(templateSource, Object.assign(doT.templateSettings, {strip : false}));
        const code = render(configs);

        log.debug("code:", code);

        const outPutFileName = getName(file, configs);

        log.debug("outPutFileName:", outPutFileName);

        outputFileSync(path.join(dest, outputDirName, outPutFileName), code);
      });
    });

  }else{
    const templateSource = readTextFile.readSync(templatePath);
    const render = doT.template(templateSource);
    const code = render(configs);

    log.debug("code:", code);

    const outPutFileName = getName(path.basename(template), { name });

    outputFileSync(`${dest}/${outPutFileName}`, code);
  }
}

const rcg = (name, templatePath, pkg, configs)=>{
  run(name, templatePath, pkg, configs).then(()=>{
    log.info(`generate code success! name:${name}, templatePath:${templatePath}`);
  }).catch((e)=>{
    log.error("error:", e);
  });
};

module.exports = rcg;

