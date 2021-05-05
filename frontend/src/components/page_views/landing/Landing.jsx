import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Container } from 'semantic-ui-react';

import { viewHeaderColor, viewSegmentColor } from '../../../utils/colors';
import ViewHeader from '../view_elements/ViewHeader';
import ViewParagraphs from '../view_elements/ViewParagraphs';
// import ViewPictures from '../view_elements/ViewPictures';

export const Landing = ({ language }) => {
  // const [lng] = useState(language);

  useEffect(() => {
  }, [language])

  const keys = {
    view_id: 'landing',
  };

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
  language: '',
};

Landing.propTypes = {
  language: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  language: state.lng
})

export default connect(mapStateToProps)(Landing);
