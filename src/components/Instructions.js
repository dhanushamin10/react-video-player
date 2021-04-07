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
        <ModalHeader>
          <h4>How it works?</h4>
        </ModalHeader>
        <ModalHeader>
          <h5> 1. Record</h5>{" "}
          <h6>
            Click on Record and practice your dance with Instructor's video
          </h6>
        </ModalHeader>

        <ModalHeader>
          <h5> 2. Save</h5> <h6>Save the practice video to the device</h6>
        </ModalHeader>
        <ModalHeader>
          <h5> 3. Compare</h5>{" "}
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
