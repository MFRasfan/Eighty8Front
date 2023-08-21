import React from 'react'
import Modal from 'react-modal'

const customStyles = {
 
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
    //   backgroundColor:"transparent",
      border:0,
      boxShadow:'none',
      transform: 'translate(-50%, -50%)',
  };
const ModalComponent = ({showModal,toggleModal, style, children}) => {
  return (
    <Modal
    // className={'scrollbar-hide'}
    closeTimeoutMS={200}
    isOpen={showModal}
    style={{content:{...customStyles,...style}}}
    contentLabel="modal"
    onRequestClose={() => toggleModal()}
  >
    {children}
  </Modal>
  )
}

export default ModalComponent