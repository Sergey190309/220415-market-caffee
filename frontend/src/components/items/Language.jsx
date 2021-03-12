import React, { useState } from 'react';
import { Flag, Button, Icon } from 'semantic-ui-react';

const Language = () => {
  const [activeLocale, setActiveLocale] = useState('');
  const [availableLocales, setAvailableLocales] = useState([]);

  return (
    <Button basic>
      <Flag name='uk' />
      EN
      <Icon name='angle down' />
    </Button>
  );
};

export default Language;
