// @flow
import * as React from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";

export const Instructions = (props) => {
  const [modal, setModal] = React.useState(true);

  const toggle = () => setModal(!modal);
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className="modal-style" size="lg">
        <ModalHeader>How it works?</ModalHeader>
        <ModalHeader>
          1. Record <br />
          <span>
            Click on Record and practice your dance with Instructor's video
          </span>
        </ModalHeader>

        <ModalHeader>
          2. Save <br />
          <span>Save the practice video to the device</span>
        </ModalHeader>
        <ModalHeader>
          3. Compare <br />
          <span>Compare the practice video with Instructor's video</span>
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
