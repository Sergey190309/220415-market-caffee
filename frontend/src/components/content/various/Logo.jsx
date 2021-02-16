// import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
// import logo from '../../../assets/images/logo.png'
import logo from '../../../assets/images/logo.png';

const Logo = ({ color, inverted }) => {
  // console.log(color)
  return (
    <div>
      <Image
        src={logo}
        alt='Nothing'
        size='mini'
        verticalAlign='middle'
        centered
      />
    </div>
  );
};

export default Logo;
