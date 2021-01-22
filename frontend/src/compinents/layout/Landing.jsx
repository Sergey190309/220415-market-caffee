import React from 'react'
import {
  Segment,
  Container,
  Header
} from 'semantic-ui-react'

const Landing = () => (
    <Container>
      <Segment color='violet'>
        <Header
        textAlign='center'
        size='medium'
        color='yellow'>
          That's header
        </Header>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quis fugiat delectus repellat iste, nisi, temporibus ullam impedit officia nulla reprehenderit quas cupiditate libero sapiente enim illo veniam harum velit.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore necessitatibus maxime veritatis expedita quos fuga repudiandae. Eligendi, doloremque fugiat, similique, repellendus dolores velit magni ab quibusdam nesciunt eos accusantium reiciendis!
        </p>
      </Segment>
    </Container>
  )

export default Landing
