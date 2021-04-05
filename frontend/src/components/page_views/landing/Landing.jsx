import React, {useState, useEffect} from 'react';
import {
  Segment,
  Container,
  Header,
} from 'semantic-ui-react';

const Landing = () => (

  <Container>
    <Segment color='violet'>
      <Header
        as='h1'
        textAlign='center'
        size='medium'
        color='yellow'>
        Couple of words on our cosy place!
      </Header>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Iusto, provident ratione numquam praesentium
        dolorem nostrum dolore asperiores in error dolores
        nihil quidem reprehenderit ut id maiores deleniti
        officiis eaque voluptates.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque quis fugiat delectus repellat iste,
        nisi, temporibus ullam impedit officia nulla
        reprehenderit quas cupiditate libero sapiente enim
        illo veniam harum velit.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Quibusdam facere possimus eligendi delectus
        recusandae a quaerat, at officiis! Culpa odit sed
        adipisci, saepe eum repellat distinctio cupiditate
        tempora magni totam! Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Autem voluptate
        inventore illum quibusdam numquam ipsum atque, unde
        nisi debitis quos molestias, magni facere,
        repellendus ab? Asperiores, officia repellat quasi
        velit sequi cupiditate accusantium recusandae
        laudantium quibusdam doloremque amet quia
        necessitatibus ratione doloribus veritatis sit dicta
        nemo harum reprehenderit? Aliquid, officia?
      </p>
    </Segment>
  </Container>
);

export default Landing;
