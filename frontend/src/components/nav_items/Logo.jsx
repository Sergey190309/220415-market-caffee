import React from "react";

import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

const Logo = ({color}) => {
  // console.log(color)
  return (
    <Link to='/'>
      <Icon name='utensils' size='large' color={color} />
    </Link>
  );
};

export default Logo;
