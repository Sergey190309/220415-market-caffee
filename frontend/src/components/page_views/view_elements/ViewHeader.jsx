import React, { useState, useEffect } from 'react';
import { Header } from 'semantic-ui-react';
// import { Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { getContents } from '../../../api/calls/getBackEndInfo';
import { viewHeaderColor } from '../../../utils/colors';

const getValues = keys => {
  console.log('getValues ->', keys);
  return getContents({ ...keys });
};

const initData = {
  title: '',
  content: '',
};

export const ViewHeader = ({ keys, initData, getValues, testFunction }) => {
  const [data, setData] = useState(initData);

  useEffect(() => {
    let isMount = true;
    const getData = async () => {
      const result = await getValues(keys);
      if (isMount) {
        console.log('ViewHeader, use effect, result ->', result);
        setData(result);
      }
    };
    getData();
    return () => {
      isMount = false;
    };
  }, [getValues, keys]);

  return (
    <Header
      color={viewHeaderColor}
      textAlign='center'
      size='medium'
      content={data.title}
    />
  );
};

ViewHeader.defaultProps = {
  keys: {},
  initData: initData,
  getValues: getValues,
};

ViewHeader.propTypes = {
  keys: PropTypes.object.isRequired,
  initData: PropTypes.object.isRequired,
  getValues: PropTypes.func.isRequired,
};

export default ViewHeader;
