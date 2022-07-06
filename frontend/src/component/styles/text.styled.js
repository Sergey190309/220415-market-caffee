import { styled } from '@mui/material/styles'

import { TextField } from '@mui/material'

import * as CL from '../../constants/colors'

export const AuthTextField = styled(TextField)({
  '& label.Mui-focused': {
    // backgroundColor: 'blue',
    color: `${CL.positive}`,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: `${CL.dialogBorders}`,
    },
    '&:hover fieldset': {
      // backgroundColor: 'red',
      borderColor: `${CL.positive}`,
    },
    '&.Mui-focused fieldset': {
      borderColor: `${CL.positive}`,
    },
  },

})