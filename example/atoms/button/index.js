import React from "react";
import PropTypes from "prop-types";
import BEMHelper from "react-bem-helper";
import "./Button.css";
import { compose, withHandlers, withState } from 'recompose';


const enhance = compose(
//  withState('email', 'setEmail', ''),
//  withHandlers({
//    onChange: ({ setEmail }) => event => setEmail(() => event.target.value),
//    submit: props => () => console.log(props),
//  })
);

const Button = ({ mode }) => {
  const classes = new BEMHelper({
    name: "button",
    prefix: "a-"
  });

  return (
    <div {...classes()}>
    </div>
  );
};


Button.propTypes = {
  mode: PropTypes.any
};

export { Button };
export default enhance(Button);
