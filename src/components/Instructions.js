// @flow
import * as React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const Instructions = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = React.useState(true);

  const toggle = () => setModal(!modal);
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className="modal-style" size="lg">
        <ModalHeader>How it works?</ModalHeader>
        <ModalHeader>
          1. Record
          <h6>
            Click on Record and practice your dance with Instructor's video
          </h6>
        </ModalHeader>

        <ModalHeader>
          2. Save<h6>Save the practice video to the device</h6>
        </ModalHeader>
        <ModalHeader>
          3. Compare
          <h6>Compare the practice video with Instructor's video</h6>
        </ModalHeader>

        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default Instructions;
