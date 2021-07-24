import isEmpty from 'lodash/isEmpty';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Container } from 'semantic-ui-react';

import ElementSwitcher from '../view_elements/ElementSwitcher';
import { lngSelector, structureSelector } from '../../../redux/slices';

import { viewSegmentColor } from '../../../utils/colors';

export const getLoadedStructure = (pageName, structures) => {
  /**
   * The function created for testing.
   * Recieve all structures, return one that correspond to the component name
   */
  const { [pageName]: value } = structures;
  // console.log('Landing, getLoadedStructure, value ->', value)
  return value;
};

export const Landing = ({ getLoadedStructure }) => {
  const [structure, setStructure] = useState({});
  const [componentName] = useState('landing');
  const { lng } = useSelector(lngSelector);
  const { loaded } = useSelector(structureSelector);

  const loadedStructures = useSelector(structureSelector);

  useEffect(() => {
    if (loaded) {
      setStructure(getLoadedStructure(componentName, loadedStructures));
    }
  }, [loaded, getLoadedStructure, componentName, loadedStructures]);

  // console.log('Landing, structure->', structure)
  const _output = structure => {
    return <ElementSwitcher viewName={componentName} structure={structure} lng={lng} />;
  };

  return (
    <Container data-testid='LandingContainer'>
      <Segment color={viewSegmentColor} data-testid='LandingSegment'>
        {isEmpty(structure) ? null : _output(structure)}
      </Segment>
    </Container>
  );
};

Landing.defaultProps = {
  getLoadedStructure: getLoadedStructure,
};

Landing.propTypes = {
  getLoadedStructure: PropTypes.func.isRequired,
};

export default Landing;
