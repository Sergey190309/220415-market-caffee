import React from "react";
// import { Link } from "react-router-dom";
// import { Menu, Button } from "semantic-ui-react";

import Aux from '../HOC/auxiliary/auxiliary'

const Item = ({ kindId, identity, title }) => {
  // The component return title and other locally depending
  // content from back end.
  // It should collect all primary keys set for get info from back end
  // and make async call to that.
  // console.log(kindId)
  return (
    <Aux>
        {title}
    </Aux>
  );
};

export default Item;
