import React from 'react';
import { Header } from 'semantic-ui-react';

import { viewHeaderColor } from '../../../utils/colors';

const ViewHeader = () => {
  return (
    <Header
      color={viewHeaderColor}
      textAlign='center'
      size='medium'
      content='View Header Element'
    />
  );
};

export default ViewHeader;
