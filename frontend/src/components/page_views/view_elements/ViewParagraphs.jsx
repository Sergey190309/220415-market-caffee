import React, { useState, useEffect, useAsync, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Card } from 'semantic-ui-react';

import { getContents } from '../../../api/calls/getBackEndInfo';
import { viewHeaderColor } from '../../../utils/colors';
import { idsByIdNum } from '../../../utils/utils';

// const getValues = keys => {
//   // console.log('getValues ->', keys);
//   return getContents({ ...keys });
// };

const getValues = async (view_id, ids) => {
  const results = [];
  ids.map(async (id, index) => {
    const keys = { view_id: view_id, identity: id };
    const result = getContents({ ...keys });
    results.push(result);
  });
  // console.log('getValues, results ->', results)

  return Promise.all(results);
};

const initData = [];
// [{
//   no: int,
//   title: string,
//   content: string,
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
      results.forEach(item => {
        item['no'] = item.identity.slice(-2);
        delete item.identity;
        // console.log('useEffect identity ->', item.no);
      });

      if (isMounted) {
        setData(results);
      }
    };
    getData();
    return () => {
      isMounted = false;
    };
  }, [keys, qnt, getValues]);

  return (
    <Fragment>
      {data.map(item => {
        return (
          <Card
            fluid
            key={item.no}
            header={item.title}
            description={item.content}
          />
        );
      })}
    </Fragment>
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