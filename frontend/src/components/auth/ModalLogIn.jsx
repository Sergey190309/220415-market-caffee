import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Container, Segment } from 'semantic-ui-react';
import LogIn from './LogIn';
import { setModalClosed } from '../../redux/actions';

// import Login from './Login'

export const ModalLogIn = ({ modalOpened, setModalClosed }) => {
  const [open, setOpen] = useState(modalOpened);
  useEffect(() => {
    setOpen(modalOpened)
  }, [modalOpened])

  const onClose = () => {
    // console.log('onclose')
    setModalClosed();
    setOpen(false)
  };

  return (
    <Modal
      basic
      onClose={onClose}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'>
      <Modal.Content>
        <LogIn />
      </Modal.Content>
    </Modal>
  );
};

ModalLogIn.propTypes = {
  setModalClosed: PropTypes.func.isRequired,
  modalOpened: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({ modalOpened: state.layout.modalOpened });

export default connect(mapStateToProps, { setModalClosed })(ModalLogIn);
