import React from "react";
import PropTypes from "prop-types";
import BEMHelper from "react-bem-helper";
import "./{{=it.name.pascalCase}}.css";
import { compose, withHandlers, withState } from 'recompose';


const enhance = compose(
//  withState('email', 'setEmail', ''),
//  withHandlers({
//    onChange: ({ setEmail }) => event => setEmail(() => event.target.value),
//    submit: props => () => console.log(props),
//  })
);

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

export { {{=it.name.pascalCase}} };
export default enhance({{=it.name.pascalCase}});
