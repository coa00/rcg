import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import {{=it.name.pascalCase}} from "./index";

storiesOf("{{=it.prefix}}-{{=it.name.paramCase}}", module)
  .add("{{=it.name.paramCase}}", () => (
    <{{=it.name.pascalCase}}/>
  ));
