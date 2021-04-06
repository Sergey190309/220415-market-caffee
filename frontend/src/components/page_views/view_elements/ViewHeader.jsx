import React, { useState, useEffect } from 'react';
import { Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { getContents } from '../../../api/calls/getContents';
import { viewHeaderColor } from '../../../utils/colors';

const getValues = keys => {
  // console.log('getValues ->', keys)
  return getContents({...keys})
};

const ViewHeader = ({ keys, getValues }) => {
  const [title, setTitle] = useState('Title');

  const onClick = () => {
    // console.log('ViewHeader keys ->', keys)
    getValues(keys)
  }

  // useEffect(() => {
  //   setTitle('Title')
  //   getValues(keys)
  //   // setTitle(getValues(keys))
  // }, [getValues, keys]);

  return (
    <Header as={Button}
      onClick={onClick}
      // color={viewHeaderColor}
      textAlign='center'
      size='medium'
      content={title}
    />
  );
};

ViewHeader.defaultProps = {
  keys: {},
  getValues: getValues,
};

ViewHeader.propTypes = {
  keys: PropTypes.object.isRequired,
  getValues: PropTypes.func.isRequired,
};

export default ViewHeader;
