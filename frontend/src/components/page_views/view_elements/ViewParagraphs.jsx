import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';

import { getContents } from '../../../api/calls/getBackEndInfo';
import { viewHeaderColor } from '../../../utils/colors';
import { idsByIdNum } from '../../../utils/utils';

// const getValues = keys => {
//   // console.log('getValues ->', keys);
//   return getContents({ ...keys });
// };

const getValues = async (view_id, ids) => {
  // console.log('getValues args, view_id ->', view_id, '; id ->', ids[0]);
  const results = [];
  ids.map(async (id, index) => {
    const keys = { view_id: view_id, identity: id };
    const result = await getContents({ ...keys });
    result['no'] = index;
    results.push(result);
  });
  // console.log('getValues ->', typeof(results))
  return results;
};

const initData = [];
// [{
//   title: '',
//   content: '',
// }];

const ViewParagraphs = ({ keys, qnt, initData, getValues }) => {
  const [data, setData] = useState(initData);
  // arguments are key and quantity of elements in an array that should be retrieved from back end
  // key contains view and name of data that with locale are primary keys in back end

  useEffect(() => {
    let isMounted = true;
    const ids = idsByIdNum(keys.identity, qnt);
    const getData = async () => {
      const results = await getValues(keys.view_id, ids);
      // console.log(results)
      if (isMounted) {
        setData(results);
      }
    };
    getData();
    return () => {
      isMounted = false;
    };
  }, [keys, qnt, getValues]);

  // console.log(data);
  // data.map((item) => console.log(item));
  // console.log(typeof(data))
  const reptiles = ["alligator", "snake", "lizard"]
  return (
    data.map((item) => <li>{item.no}</li>)
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
  initData: PropTypes.array.isRequired,
  getValues: PropTypes.func.isRequired,
};

export default ViewParagraphs;
