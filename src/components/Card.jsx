import React, { useEffect } from "react";
import tarotDeath from "../assets/Death.jpg";
import { useParams, useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";

function Card() {
  const grabURL = useParams();

  return (
    <div id="cardPage">
      <div id="cards__main">
        <div className="cards__container">
          <div className="row">
            <div className="card__selected--top">
              <Link to="/main" className="card__link">
                <FontAwesomeIcon icon={faArrowLeft} />
              </Link>
              <h2 className="card__selected--title--top">Back</h2>
              <h1 className="aboutTitle">About</h1>
            </div>
            <div className="card__selected">
              <figure className="card__selected--figure">
                <img src={tarotDeath} alt="" className="card__selected--img" />
              </figure>
              <div className="card__selected--description">
                <h2 className="card__selected--title">Death</h2>
                <div className="card__summary">
                  <h3 className="card__summary--title">Summary</h3>
                  <p className="card__summary--para">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Cum repellat expedita necessitatibus ea aliquam voluptatibus
                    commodi illo, est nam quis quisquam, labore ullam. Possimus
                    alias et nobis vitae, dolorem fuga!
                  </p>
                  <p className="card__summary--para">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Cum repellat expedita necessitatibus ea aliquam voluptatibus
                    commodi illo, est nam quis quisquam, labore ullam. Possimus
                    alias et nobis vitae, dolorem fuga!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cards__container">
          <div className="row">
            <div className="card__selected--top">
              <h2 className="card__selected--title--top">Recommended Cards</h2>
            </div>
            <div className="cards">
              {" "}
              {/* Assuming Cards component exists and renders cards */}
              {/* Logic to filter and display recommended cards remains the same */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Card;
