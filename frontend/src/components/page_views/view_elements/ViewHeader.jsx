import React, { useState, useEffect } from 'react';
import { Header } from 'semantic-ui-react';
// import { Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { getContents } from '../../../api/calls/getBackEndInfo';
import { viewHeaderColor } from '../../../utils/colors';

const getValues = keys => {
  // console.log('getValues ->', keys)
  return getContents({ ...keys });
};

const initData = {
  title: 'Title',
  content: 'Content',
};

const ViewHeader = ({ keys, initData, getValues }) => {
  const [data, setData] = useState(initData);

  // const onClick = async () => {
  //   const result = await getValues(keys);
  //   console.log('ViewHeaders on Click ->', result);
  // };

  useEffect(() => {
    let isMount = true;
    const getData = async () => {
      const result = await getValues(keys);
      if (isMount) {
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
      // as={Button}
      // onClick={onClick}
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
