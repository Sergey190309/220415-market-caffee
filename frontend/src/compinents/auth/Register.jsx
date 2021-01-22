import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Form, Header, Grid, Icon, Segment, Button, Message} from 'semantic-ui-react';
// import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState(
    {
      user_name: '',
      email: '',
      password: '',
      password2: ''
  });

  const {user_name, email, password, password2} = formData;

  const onChange = e => {
    // console.log(e.target.value)
    return setFormData({...formData, [e.target.name]: e.target.value})
  };

  const  onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Passwords do not match')
    } else {
      console.log('Success!')
    }
  };

  return (
    <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header size='medium' color='teal' textAlign='center'>
          <Icon name='utensils' size='tiny' /> Sign Up
        </Header>
        <Form size='large' onSubmit={e => onSubmit(e)}>
          <Segment stacked>
            <Form.Input
              fluid icon='user' iconPosition='left'
              placeholder='Choose user name, not compalsory'
              name='user_name'
              value={user_name} onChange={e => onChange(e)}
            />
            <Form.Input
              fluid icon='user' iconPosition='left'
              type='email' placeholder='Email here'
              name='email' required
              value={email} onChange={e => onChange(e)}
            />
            <Form.Input
              fluid icon='lock' iconPosition='left'
              type='password' placeholder='Your password here'
              autoComplete='on' name='password' required
              value={password} onChange={e => onChange(e)}
            />
            <Form.Input
              fluid icon='lock' iconPosition='left'
              type='password' placeholder='Your password here again'
              name='password2' autoComplete='on' required
              value={password2} onChange={e => onChange(e)}
            />
            <Button color='teal' fluid size='large'>
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <Link to='/login'>Log in</Link>
        </Message>
      </Grid.Column>
    </Grid>
)}

export default Register
