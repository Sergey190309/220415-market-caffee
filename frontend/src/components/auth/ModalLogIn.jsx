import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import LogIn from './LogIn';
import { setModalClosed } from '../../redux/actions';

export const onCloseHandle = (setModalClosed, setOpen) => {
  setModalClosed();
  setOpen(false);
};

export const ModalLogIn = ({ modalOpened, setModalClosed, onCloseHandle }) => {
  const [open, setOpen] = useState(modalOpened);
  useEffect(() => {
    setOpen(modalOpened);
  }, [modalOpened]);

  const _onCloseHandle = () => {
    onCloseHandle(setModalClosed, setOpen);
  };

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
      content={<LogIn onCancelClick={_onCloseHandle} />}
    />
  );
};

ModalLogIn.defaultProps = {
  modalOpened: false,
  setModalClosed: () => {},
  onCloseHandle: onCloseHandle,
};

ModalLogIn.propTypes = {
  modalOpened: PropTypes.bool.isRequired,
  setModalClosed: PropTypes.func.isRequired,
  onCloseHandle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ modalOpened: state.layout.modalOpened });

export default connect(mapStateToProps, { setModalClosed })(ModalLogIn);
