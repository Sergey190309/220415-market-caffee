import isEmpty from 'lodash/isEmpty';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Container } from 'semantic-ui-react';
import Output from '../view_elements/ElementSwitcher';

import { viewSegmentColor } from '../../../utils/colors';

export const Landing = ({ structureLoaded, loadedStructure, lng }) => {
  // const [lng] = useState(language);
  const [structure, setStructure] = useState({});

  useEffect(() => {
    // -> upon rendering set structre with loaded values
    setStructure(loadedStructure);
    // console.log('landing, useEffect, structure ->', structure);
  }, [structureLoaded, loadedStructure]);

  const _output = structure => {
    return <Output viewName='landing' structure={structure} lng={lng} />;
  };

  return (
    <Container>
      <Segment color={viewSegmentColor}>
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
  // _output: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  structureLoaded: state.structure.loaded,
  loadedStructure: state.structure.landing,
  lng: state.lng
});

const mapDispatchToProps = dispatch => ({
  // structureStart: viewName => dispatch(structureStart(viewName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
