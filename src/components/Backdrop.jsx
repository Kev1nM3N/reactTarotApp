import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Backdrop({ toggleModal }) {
  function closeMenu (){
    document.body.classList.remove(`menu__open`)
  }

  return (
    <div className="menu__backdrop">
      <FontAwesomeIcon
        icon={faXmark}
        className="btn__menu btn__menu--close click"
        onClick={closeMenu}
        style={{ cursor: "pointer", fontSize: "25px" }}
      />
      <ul className="menu__links">
        <li>
          <Link to="/" onClick={closeMenu} className="nav__link">
            Home
          </Link>
        </li>
        <li>
          <Link to={null} onClick={toggleModal} className="nav__link">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/main" onClick={closeMenu} className="nav__link">
            Browse Cards
          </Link>
        </li>
        <li>
          <Link to={null} className="nav__link">
            Log in
          </Link>
        </li>
        <li>
          <Link to={null} className="nav__link">
            <button className="registerButton">Register</button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Backdrop;
