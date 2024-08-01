import React from "react";
import KDLogo from '../assets/KD-left-transparent-png.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import Modal from "./Modal";
import Backdrop from "./Backdrop";

function Nav({ toggleModal }) {
  function openMenu (){
    document.body.classList += (` menu__open`)
}

const location = useLocation();

const navStyle = {
  backgroundColor: location.pathname.startsWith("/main") || location.pathname.startsWith("/search") ? "#fff8e7" : "initial"
};

  return (
    <nav style={navStyle}>
      <div className="left-side">
        <img
          className="headerLogo"
          src={KDLogo}
          alt=""
        />
      </div>

      <div className="right-side">
        <ul className="AboutInfo">
          {location.pathname !== "/" && (
            <Link to="/">
              <li className="link__hover-effect">Home</li>
            </Link>
          )}
          <Link to={null}>
            <li onClick={toggleModal} className="link__hover-effect">Contact</li>
          </Link>
          <Link to="/main">
            <li className="link__hover-effect">Browse Cards</li>
          </Link>
          <Link to={null}>
            <li style={{cursor: "no-drop"}} className="link__hover-effect">Login</li>
          </Link>
          <Link to={null}>
            <button style={{cursor: "no-drop"}} className="registerButton">Register</button>
          </Link>
        </ul>

        <Link className="btn__menu--link" to={null}>
          <FontAwesomeIcon 
            onClick={openMenu}
            icon={faBars}
            alt="hamburgerMenu"
            className="btn__menu"
            style={{fontSize: "20px"}}
          />
        </Link>

        <Backdrop openMenu={openMenu} toggleModal={toggleModal}/>
      </div>

      <Modal toggleModal={toggleModal}/>
    </nav>
  );
}

export default Nav;
