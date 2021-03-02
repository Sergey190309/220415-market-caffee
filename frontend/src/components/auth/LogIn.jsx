import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Header, Grid, Icon, Segment, Button, Message} from 'semantic-ui-react'

const LogIn = () => {
  const [formData, setFormData] = useState ({
    email: '',
    password: ''
  });

  const {email, password} = formData

  const onChange = e => {
    return setFormData({...formData, [e.target.name]: e.target.value})
  };

  const onSubmit = async e => {
    e.preventDefault();
      console.log('Success!')
  }

  return (
    <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header size='medium' color='teal' textAlign='center'>
          <Icon name='utensils' size='tiny' /> Log-in to your account
        </Header>
        <Form size='large' onSubmit={e => onSubmit(e)}>
          <Segment stacked>
            <Form.Input
              fluid icon='user' iconPosition='left'
              type='email' placeholder='E-mail address'
              name='email' required
              value={email} onChange={e => onChange(e)}
            />
            <Form.Input
              fluid icon='lock' iconPosition='left'
              type='password' placeholder='Password'
              autoComplete='on' name='password' required
              value={password} onChange={e => onChange(e)}
            />
            <Button color='teal' fluid size='large'>
              LogIn
            </Button>
          </Segment>
      </Form>
      <Message>
        New to us? <Link to='/register'>Sign Up</Link>
      </Message>
      </Grid.Column>
    </Grid>

    //   <Form.Input
    //   label='Enter password' type='password'
    //   placeholder='Your password here'
    //   autoComplete='on' name='password' required
    //   />

    //   <Form.Button>
    //     Submit
    //   </Form.Button>
    // </Form>
  );
}

export default LogIn
