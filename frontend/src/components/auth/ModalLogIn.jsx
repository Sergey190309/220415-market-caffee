import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Loader from '../items/Loader';
import { setModalClosed } from '../../redux/actions';

export const onCloseHandle = (setModalClosed, setOpen) => {
  setModalClosed();
  setOpen(false);
};

export const ModalLogIn = ({ kindOfModal, setModalClosed, onCloseHandle }) => {
  // console.log('ModalLogIn', kindOfModal)
  const [open, setOpen] = useState(kindOfModal === '' ? false : true);
  useEffect(() => {
    setOpen(kindOfModal === '' ? false : true);
  }, [kindOfModal]);

  const _onCloseHandle = () => {
    onCloseHandle(setModalClosed, setOpen);
  };

  let content = '';
  switch (kindOfModal) {
    case 'LogIn':
      content = <LogIn onCancelClick={_onCloseHandle} />;
      break;
    case 'SignUp':
      content = <SignUp onCancelClick={_onCloseHandle}/>;
      break;
    case 'Loader':
      content = <Loader />;
      break;
    default:
      content = '';
  }

  return (
    <Modal
      data-testid='modal'
      basic
      centered={false}
      onClose={_onCloseHandle}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      dimmer='blurring'
      content={content}
      // content={<LogIn onCancelClick={_onCloseHandle} />}
    />
  );
};

ModalLogIn.defaultProps = {
  kindOfModal: '',
  setModalClosed: () => {},
  onCloseHandle: onCloseHandle,
};

ModalLogIn.propTypes = {
  kindOfModal: PropTypes.string.isRequired,
  setModalClosed: PropTypes.func.isRequired,
  onCloseHandle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ kindOfModal: state.device.kindOfModal });
// const mapStateToProps = state => ({ kindOfModal: state.layout.kindOfModal });

export default connect(mapStateToProps, { setModalClosed })(ModalLogIn);
