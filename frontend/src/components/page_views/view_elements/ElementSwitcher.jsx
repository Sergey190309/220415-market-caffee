import React, { Fragment } from 'react';
import { Divider } from 'semantic-ui-react';
import ViewHeader from './ViewHeader';
import ViewFooter from './ViewFooter';
import ViewVBlock from './ViewVBlock';
import ViewHBlock from './ViewHBlock';

export const Output = ({ structure, viewName }) => {
  // console.log(structure);
  const keys = Object.keys(structure);
  const output = keys.map((key, index) => {
    const componentType = structure[key]['type'];
    const componentSubType = structure[key]['subtype'] ? structure[key]['subtype'] : null;
    const subComponentQnt = structure[key]['qnt'] ? structure[key]['qnt'] : null;
    let component;
    const recordId =
      `${key}_${componentType}` +
      (componentSubType ? `_${componentSubType}` : '') +
      (subComponentQnt ? `_${subComponentQnt}` : '');
    // console.log(recordId)
    const props = { recordId: recordId, viewName: viewName };
    switch (componentType) {
      case 'header':
        component = <ViewHeader {...props} />;
        break;
      case 'footer':
        component = <ViewFooter {...props} />;
        break;
      case 'hblock':
        component = <ViewHBlock {...props} />;
        break;
      case 'vblock':
        component = <ViewVBlock {...props} />;
        break;
      default:
        component = <ViewHeader />;
    }
    return (
      <Fragment key={key}>
        {component}
        {index < keys.length - 1 ? <Divider /> : null}
      </Fragment>
    );
  });
  // console.log('output, output ->', output);
  return output;
};

export default Output;
