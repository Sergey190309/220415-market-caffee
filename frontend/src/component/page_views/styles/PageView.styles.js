import styled from 'styled-components'
import * as CL from '../../../constants/colors'

export const PageViewDiv = styled.div`
  /* min-height: 100vh;
  width: 100vh; */
  background-color: ${CL.pageViewBackground};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const PageViewH1 = styled.h1`
    font-size: clamp(3rem, 5vw, 7vw);
    color: ${CL.pageViewH1};
    font-weight: 700;
    margin: 0;
    padding: 0;
    user-select: none; /* supported by Chrome and Opera */
   -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
   -moz-user-select: none; /* Firefox */
   -ms-user-select: none; /* Internet Explorer/Edge */
`