import React from "react";
import { Link } from "react-router-dom";
import { Menu,  } from "semantic-ui-react";

import Language from "../language/Language";

const Navbar = () => {
  return (
    <div>
      <Menu pointing secondary></Menu>
    </div>
  );
};

export default Navbar;
//   return (

//     <Menu stackable>
//       <Menu.Item
//       name='logo'>
//         <Link to='/'>
//           <Icon name='utensils' size='large' />
//         </Link>

//       </Menu.Item>
//       <Menu.Item
//       name='register'>
//         <Link to='/register'>Register</Link>
//       </Menu.Item>

//       <Menu.Menu position='right'>
//         <Menu.Item
//         name='login'>
//           <Link to='/login'><Button>Log-In</Button></Link>
//         </Menu.Item>

//         <Menu.Item
//         name='language'>
//           <Link to='#'><Language /></Link>
//         </Menu.Item>
//       </Menu.Menu>
//     </Menu>
//   )
// }
