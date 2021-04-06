// @flow
import * as React from "react";
import Stepper from "react-stepper-horizontal";

export default function Header() {
  return (
    <div>
      <Stepper
        steps={[{ title: "Record" }, { title: "Save" }, { title: "Compare" }]}
        activeStep={0}
        activeColor="#15cca0"
        activeTitleColor="#15cca0"
        defaultTitleColor="#a8a8a8"
        completeColor="#15cca0"
        completeTitleColor="#15cca0"
        completeBarColor="#15cca0"
      />
    </div>
  );
}
