import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import { Container, Header } from 'semantic-ui-react';

// import { getContents } from '../../../api/calls/getViewsContents';
// import { viewHeaderColor } from '../../../utils/colors';

export const ViewHeader = ({ recordId, viewName, lng }) => {
  const [content, setContent] = useState({ title: '', content: '' });
  // console.log('ViewHeader, type ->', recordId);
  return (
    <div>
      <h1>ViewHeader</h1>
      <h2>{recordId}</h2>
      <h2>{viewName}</h2>
      <h2>{lng}</h2>
    </div>
  );
};

ViewHeader.defaultProps = {
  recordId: '',
  viewName: '',
  lng: '',
};

ViewHeader.propTypes = {
  recordId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  lng: state.lng,
});

// const mapDispatchToProps = dispatch => ({
// structureStart: viewName => dispatch(structureStart(viewName)),
// });

export default connect(mapStateToProps)(ViewHeader);

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
