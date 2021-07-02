import React, { Fragment } from 'react';
import { Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import ViewHeader from './ViewHeader';
import ViewFooter from './ViewFooter';
import ViewVBlock from './ViewVBlock';
import ViewHBlock from './ViewHBlock';
import ViewNothing from './ViewNothing';

const ElementSwitcher = ({ structure, viewName, lng }) => {
  // console.log(structure);
  const keys = Object.keys(structure);
  const output = keys.map((key, index) => {
    const componentType = structure[key]['type'];
    const componentSubType = structure[key]['subtype'] ? structure[key]['subtype'] : null;
    const subComponentQnt = structure[key]['qnt'] ? structure[key]['qnt'] : null;
    const recordId =
    `${key}_${componentType}` +
    (componentSubType ? `_${componentSubType}` : '') +
    (subComponentQnt ? `_${subComponentQnt}` : '');
    // console.log(recordId)
    let component;
    const props = { recordId: recordId, viewName: viewName, lng: lng };
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
        component = <ViewNothing {...props} />;
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

ElementSwitcher.defaultProps = {
  structure: {},
  viewName: '',
  lng: '',
};

ElementSwitcher.propTypes = {
  structure: PropTypes.object.isRequired,
  viewName: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
}

export default ElementSwitcher;
