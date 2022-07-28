import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'

import * as SZ from '../../../constants/sizes'

export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'openedDrawer' })(
  ({ theme, openedDrawer }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -SZ.drawerWidth,
    ...(openedDrawer && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
)

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'openedDrawer'
})(({ theme, openedDrawer }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(openedDrawer && {
    width: `calc(100% - ${SZ.drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: SZ.drawerWidth,
  }),
}))

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}))
