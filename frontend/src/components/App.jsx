import React, {
  Fragment,
  useState, useEffect
} from "react";
// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Container, Header, Segment } from "semantic-ui-react";

// import Layout from './layout/Layout'

import { setDeviceSize } from "../redux/actions";

const App = ({ setDeviceSize }) => {
  // const [width, setWidth] = useState(0);

  // useEffect(() => {
  //   updateDimentions();
  //   window.addEventListener("resize", updateDimentions);
  //   // console.log('useEffect width', width)
  //   return () => window.removeEventListener("resize", updateDimentions);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [width]);

  // const updateDimentions = () => {
  //   const _width = window.outerWidth;
  //   // console.log("Update dementions - width from window", _width);
  //   setWidth(_width);
  //   setDeviceSize(_width);
  // };

  return (
    <Container>
      <Header as='h1'color='olive' textAlign='center'>
        App!
      </Header>
      <Segment textAlign='left'>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dignissimos voluptates aliquam quos vero dolor maxime quod molestias ex cumque excepturi, ad corporis quibusdam qui sapiente veritatis explicabo reprehenderit voluptas quo error amet vitae? Porro dicta aliquid tempora perspiciatis sapiente a, suscipit amet iusto in possimus odio, eaque nisi saepe quisquam accusamus explicabo sunt maxime tempore odit quidem aut harum. Reprehenderit saepe eaque commodi, voluptates maxime accusantium pariatur, unde debitis, blanditiis asperiores quo vero at ut quas omnis dolorum aspernatur ad soluta aliquid. Nulla tenetur quasi quas dolore nam doloribus cumque adipisci sapiente sed commodi omnis, similique corrupti repudiandae? Corporis!
        </p>
      </Segment>
    </Container>
    // <Fragment>
    //   <Layout />
    // </Fragment>
  );
};

// App.propTypes = {
//   setDeviceSize: PropTypes.func.isRequired,
// };

export default App;
// export default connect(null, { setDeviceSize })(App);
