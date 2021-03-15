import React from 'react';
import { Translate } from 'react-redux-i18n';

import { Button } from 'semantic-ui-react';

const LogInOut = ({title}) => {
  return (
    <Button
      // basic
    >
      <Translate value={title} />
    </Button>
  );
};

export default LogInOut;
