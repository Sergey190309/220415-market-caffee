import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';

import { getContents } from '../../../api/calls/getBackEndInfo';
import { viewHeaderColor } from '../../../utils/colors';

const getValues = keys => {
  // console.log('getValues ->', keys);
  return getContents({ ...keys });
};

const initData = {
  title: '',
  content: '',
};



const ViewParagraphs = ({ keys, qnt, initData, getValues }) => {
  const [data, setData] = useState(initData);
  // arguments are key and quantity of elements in an array that should be retrieved from back end
  // key contains view and name of data that with locale are primary keys in back end
  console.log('ViewParagraphs, keys ->', keys);
  console.log('ViewParagraphs, qnt ->', qnt);
  const ids = [];
  let index = 0;
  while (index < qnt) {
    let result ;
    if (index < 10) {
      result = `_0${index}`
    } else {
      result = `_${index}`
    }
    console.log(result, 'type -', typeof (result))
    index++
  }

  console.log('ViewParagraphs, ids ->', ids);
  return (
    <div>
      <h3>View paragraph</h3>
    </div>
  );
};

ViewParagraphs.defaultProps = {
  keys: {},
  qnt: 0,
  initData: initData,
  getValues: getValues,
};

ViewParagraphs.propTypes = {
  keys: PropTypes.object.isRequired,
  qnt: PropTypes.number.isRequired,
  initData: PropTypes.object.isRequired,
  getValues: PropTypes.func.isRequired,
};

export default ViewParagraphs;
