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
  {{~it.props :value:index}}{{=value}}: PropTypes.any, {{~}}
};

export default {{=it.name.pascalCase}};