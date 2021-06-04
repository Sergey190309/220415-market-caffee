import isEmpty from 'lodash/isEmpty';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Container } from 'semantic-ui-react';
import Output from '../view_elements/ElementSwitcher';
import ViewHeader from '../view_elements/ViewHeader';
// import { structureStart } from '../../../redux/actions/structure';

import {
  // viewHeaderColor,
  viewSegmentColor,
} from '../../../utils/colors';
// import ViewHeader from '../view_elements/ViewHeader';
// import ViewParagraphs from '../view_elements/ViewParagraphs';
// import ViewPictures from '../view_elements/ViewPictures';

export const Landing = ({ structureLoaded, loadedStructure }) => {
  // const [lng] = useState(language);
  const [structure, setStructure] = useState({});

  // let output = null

  useEffect(() => {
    // -> upon rendering set structre with loaded values
    setStructure(loadedStructure);
    //
    // console.log('landing, useEffect, structure ->', structure);
    // structureStart('landing');
  }, [structureLoaded, loadedStructure]);

  // if (structure !== {}) {
  // output = _output(structure)
  // }

  const _output = (structure) => {
    return (<Output structure={structure} />)
  }

  return (
    <Container>
      {/* <Segment color={viewSegmentColor}>{_output(structure)}</Segment> */}
      <Segment color={viewSegmentColor}>
        {/* <ViewHeader componentType='something' /> */}
        {isEmpty(structure) ? null : _output(structure)}
      </Segment>
    </Container>
  );
};

Landing.defaultProps = {
  structureLoaded: false,
  loadedStructure: {},
  // _output: output,
};

Landing.propTypes = {
  structureLoaded: PropTypes.bool.isRequired,
  loadedStructure: PropTypes.object.isRequired,
  // _output: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  structureLoaded: state.structure.loaded,
  loadedStructure: state.structure.landing,
});

const mapDispatchToProps = dispatch => ({
  // structureStart: viewName => dispatch(structureStart(viewName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
