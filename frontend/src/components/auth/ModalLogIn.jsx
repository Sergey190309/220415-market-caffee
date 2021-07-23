import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Loader from '../items/Loader';
import { closeModal, deviceSelector } from '../../redux/slices';
// import { closeModal } from '../../redux/actions';

export const onCloseHandle = (dispatch, closeModal, setOpen) => {
  dispatch(closeModal());
  setOpen(false);
};

export const ModalLogIn = ({ closeModal, onCloseHandle }) => {
  // console.log('ModalLogIn, kindOfModal ->', kindOfModal)
  const [open, setOpen] = useState(false);
  const { kindOfModal } = useSelector(deviceSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('ModalLogIn, useEffect, kindOfModal ->', kindOfModal);
    setOpen(kindOfModal === '' ? false : true);
  }, [kindOfModal]);

  const _onCloseHandle = () => {
    onCloseHandle(dispatch, closeModal, setOpen);
  };

  let content = '';
  switch (kindOfModal) {
    case 'logIn':
      content = <LogIn onCancelClick={_onCloseHandle} />;
      break;
    case 'signUp':
      content = <SignUp onCancelClick={_onCloseHandle} />;
      break;
    case 'loader':
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
  // kindOfModal: '',
  closeModal: closeModal,
  onCloseHandle: onCloseHandle,
};

ModalLogIn.propTypes = {
  // kindOfModal: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  onCloseHandle: PropTypes.func.isRequired,
};


export default ModalLogIn;
// export default connect(mapStateToProps, { closeModal })(ModalLogIn);
