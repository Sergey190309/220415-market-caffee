import styled from 'styled-components'

export const ColoredDiv = styled.div`
  color: ${props => props.color || 'white'};
  background: ${props => props.background || 'black'};
`