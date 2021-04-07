import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  return (
    <nav>
      <FontAwesomeIcon icon={faLongArrowAltLeft} size="2x" />
      <h1>Practice</h1>
      <FontAwesomeIcon icon={faInfoCircle} size="2x" />
    </nav>
  );
};

export default Navbar;
