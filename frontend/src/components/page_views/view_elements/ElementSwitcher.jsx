import React from 'react';
import ViewHeader from './ViewHeader';

export const Output = ({ structure }) => {
  console.log('Output, structure ->', structure)
  // return <ViewHeader />
  return <ViewHeader componentType={ structure['00']['type'] } />
  // const keys = Object.keys(structure);
  // keys.forEach(item => {
  //   console.log(item, '\t-\t', structure[item]['type']);
  //   switch (structure[item]['type']) {
  //     case 'header':
  //       console.log('ViewHeader');
  //       return (
  //         <ViewHeader type={structure[item]['type']} />
  //       );

  //     default:
  //       return null;
  //   }
  // });
  // console.log('output, structure ->', structure);
};

export default Output;
