import React, { useState } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import {
  Form,
  Header,
  Grid,
  Icon,
  Segment,
  Button,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Translate, I18n } from 'react-redux-i18n';

import { setModalOpened } from '../../redux/actions';

export const onChange = (setFormData, formData, fieldName, fieldData) => {
  // const { name, value } = fieldData;
  return setFormData({ ...formData, [fieldName]: fieldData });
};

export const onSubmit = formData => {
  const { email, password } = formData;
  console.log('Email -', email);
  console.log('Password -', password);
};

export const LogIn = ({
  onChange,
  onSubmit,
  onCancelClick,
  initState,
  setModalOpened,
}) => {
  // console.log('LogIn -', initState)
  const [formData, setFormData] = useState(initState);
  // console.log(formData)
  const { email, password } = formData;

  const _onChange = ({ name, value }) => {
    // console.log(name, ', ', value)
    onChange(setFormData, formData, name, value);
  };

  const _onSubmit = async evt => {
    evt.preventDefault();
    onCancelClick();
    onSubmit(formData);
  };

  const _onCancelClick = evt => {
    evt.preventDefault();
    onCancelClick();
  };

  const color = 'teal';
  const hazColor = 'orange';

  return (
    <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size='large' onSubmit={evt => _onSubmit(evt)} >
          <Header as='h2' textAlign='center' color={color}>
            <Segment.Inline>
              <Icon name='utensils' size='large' />
              <Translate value='logIn.header' />
            </Segment.Inline>
          </Header>
          <Segment color={color} stacked>
            <Form.Input
              fluid
              icon='envelope'
              iconPosition='left'
              type='email'
              placeholder={I18n.t('logIn.placeHolders.email')}
              name='email'
              required
              // error='fuck'
              value={email}
              onChange={evt => _onChange(evt.target)}
            />
            <Form.Input
              data-testid='password'
              fluid
              icon='lock'
              iconPosition='left'
              type='password'
              placeholder={I18n.t('logIn.placeHolders.password')}
              autoComplete='on'
              name='password'
              required
              value={password}
              onChange={evt => _onChange(evt.target)}
            />
            <Segment.Inline>
              <Button.Group fluid>
                <Button color={color} size='large' content={I18n.t('logIn.buttons.logIn')} />
                <Button.Or text={I18n.t('logIn.buttons.or')} />
                <Button
                  color={hazColor}
                  size='large'
                  onClick={evt => _onCancelClick(evt)}
                  content={I18n.t('logIn.buttons.cancel')}
                />
              </Button.Group>
            </Segment.Inline>
          </Segment>
        </Form>
        <Segment>
          <Grid columns={2}>
            <Grid.Row verticalAlign='middle'>
              <Grid.Column width='9' textAlign='right'>
                <Header as='h4' content={I18n.t('logIn.message')} />
              </Grid.Column>
              <Grid.Column width='7' textAlign='left'>
                <Button
                  // primary
                  color={color}
                  floated='left'
                  content={I18n.t('logIn.buttons.signUp')}
                  onClick={() => setModalOpened('SignUp')}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

LogIn.defaultProps = {
  onChange: onChange,
  onSubmit: onSubmit,
  onCancelClick: () => {},
  initState: {
    email: '',
    password: '',
  },
  setModalOpened: () => {},
};

LogIn.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  initState: PropTypes.object.isRequired,
  setModalOpened: PropTypes.func.isRequired,
};

// export default LogIn;
export default connect(null, { setModalOpened })(LogIn);
