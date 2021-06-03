import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Container } from 'semantic-ui-react';
// import { structureStart } from '../../../redux/actions/structure';

import {
  // viewHeaderColor,
  viewSegmentColor,
} from '../../../utils/colors';
// import ViewHeader from '../view_elements/ViewHeader';
// import ViewParagraphs from '../view_elements/ViewParagraphs';
// import ViewPictures from '../view_elements/ViewPictures';

export const Landing = ({loaded, loadedStructure}) => {
  // const [lng] = useState(language);
  const [structure, setStructure] = useState({});

  useEffect(() => {
    // -> upon rendering set structre with loaded values
    setStructure(loadedStructure)
    //
    // console.log('landing, useEffect, structure ->', structure);
    // structureStart('landing');
  }, [loaded, loadedStructure, structure]);

  // const keys = {
  //   view_id: 'landing',
  // };

  return (
    <Container>
      <Segment color={viewSegmentColor}>
        {/* <ViewHeader keys={{ ...keys, identity: 'txt_heading_00' }} /> */}
        {/* <ViewParagraphs keys={{...keys, identity: 'txt_presentation'}} qnt={3} /> */}
        {/* <ViewPictures /> */}
        {/* <ViewParagraphs /> */}
      </Segment>
    </Container>
  );
};

Landing.defaultProps = {
  loaded: false,
  loadedStructure: {},
};

Landing.propTypes = {
  loaded: PropTypes.bool.isRequired,
  loadedStructure: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  loaded: state.structure.loaded,
  loadedStructure: state.structure.landing,
});

const mapDispatchToProps = dispatch => ({
  // structureStart: viewName => dispatch(structureStart(viewName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
