import isEmpty from 'lodash/isEmpty';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Container } from 'semantic-ui-react';

import ElementSwitcher from '../view_elements/ElementSwitcher';

import { viewSegmentColor } from '../../../utils/colors';

export const Landing = ({ structureLoaded, loadedStructure, lng }) => {
  // const [lng] = useState(language);
  const [structure, setStructure] = useState({});

  useEffect(() => {
    // -> upon rendering set structre with loaded values
    if (structureLoaded) {
      setStructure(loadedStructure);
    }
    // console.log('landing, useEffect, structure ->', structure);
  }, [structureLoaded, loadedStructure]);

  const _output = structure => {
    return <ElementSwitcher viewName='landing' structure={structure} lng={lng} />;
  };
  // console.log('Landing, loadedStructure ->', loadedStructure)

  return (
    <Container data-testid='LandingContainer'>
      <Segment color={viewSegmentColor} data-testid='LandingSegment'>
        {isEmpty(structure) ? null : _output(structure)}
      </Segment>
    </Container>
  );
};

Landing.defaultProps = {
  structureLoaded: false,
  loadedStructure: {},
  lng: '',
};

Landing.propTypes = {
  structureLoaded: PropTypes.bool.isRequired,
  loadedStructure: PropTypes.object.isRequired,
  lng: PropTypes.string.isRequired,
  // _output: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  structureLoaded: state.structure.loaded,
  loadedStructure: state.structure.landing,
  lng: state.lng,
});

const mapDispatchToProps = dispatch => ({
  // structureStart: viewName => dispatch(structureStart(viewName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
