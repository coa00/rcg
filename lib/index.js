const readPkg = require("read-pkg");
const readTextFile = require("read-text-file");
const log = require("loglevel");
const doT = require("doT");
const changeCase = require("change-case");
const outputFileSync = require("output-file-sync");
const fs = require("fs");

log.setLevel("debug");

function fileName(string, values){
  return string.replace(/\$\{(.*?)\}/g, function(all, key){
    return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : "";
  });
}

async function run(name, template, { prefix = "", props="", dest = "./" }) {
  log.debug(prefix, props, dest);

  props = String(props).split(",");

  const pkg = await readPkg();
  const rootTemplatePath = pkg.rcg;

  let templatePath = template;

  if (template && rootTemplatePath && rootTemplatePath.templates){
    templatePath = rootTemplatePath.templates + template;
  }else if (rootTemplatePath){
    templatePath = rootTemplatePath.templates;
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

const rcg = (name, templatePath,configs)=>{
  run(name, templatePath, configs).then(()=>{
    log.info(`generate code success! name:${name}, templatePath:${templatePath}`);
  }).catch((e)=>{
    log.error("error:", e);
  });
};

module.exports = rcg;

