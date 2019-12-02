import React, { Component } from "react";
import Modal from "react-responsive-modal";

class ModalComponent extends Component {

  onCloseModal = () => {
    this.props.onClose();
  }

  render() {

    return (
      <>
        <Modal 
          classNames={{
            overlay: "modal-overlay",
            modal: "modal-wrap",
            closeButton: "modal-close-btn"
          }}
          open={this.props.open} 
          onClose={this.onCloseModal} 
          center
        >
          {this.props.children}
        </Modal>
      </>
    );
  }
}

export default ModalComponent;
