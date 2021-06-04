import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';

// import { getContents } from '../../../api/calls/getViewsContents';
import { viewHeaderColor } from '../../../utils/colors';

export const ViewHeader = ({ componentType }) => {
  // console.log('ViewHeader, type ->', componentType);
  return (
    <div>
      <h1>{componentType}</h1>
    </div>
  );
};

// const getValues = keys => {
//   console.log('getValues ->', keys);
//   // return getContents({ ...keys });
// };

// const initData = {
//   title: '',
//   content: '',
// };

// export const ViewHeader = ({ keys, initData, getValues }) => {
//   // key contains view and name of data that with locale are primary keys in back end
//   const [data, setData] = useState(initData);

//   useEffect(() => {
//     let isMount = true;
//     const getData = async () => {
//       const result = await getValues(keys);
//       if (isMount) {
//         // console.log('ViewHeader, use effect, result ->', result);
//         setData(result);
//       }
//     };
//     getData();
//     return () => {
//       isMount = false;
//     };
//   }, [getValues, keys]);

//   return (
//     <Container textAlign='center'>
//       <Header
//         data-testid='header'
//         color={viewHeaderColor}
//         textAlign='center'
//         size='medium'
//         content={data.title}
//       />
//       <p data-testid='content'>{data.content}</p>
//     </Container>
//   );
// };

ViewHeader.defaultProps = {
  componentType: 'ViewHeader',
};

ViewHeader.propTypes = {
  componentType: PropTypes.string.isRequired,
};

export default ViewHeader;
