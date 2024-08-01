import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import tarotBackDesign from "../assets/Tarot back design.jpg";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import cardImageMapping from "../cardImageMapping";
import { useNavigate } from 'react-router-dom';

function Main({ toggleModal }) {
  const { query } = useParams();
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [filter, setFilter] = useState(""); // State to store the filter value
  const navigate = useNavigate();
  let mainSearchBar = document.querySelector(".mainSearchBar")

  async function fetchCards(searchTerm = '') {
    const response = await axios.get("https://tarotapi.dev/api/v1/cards");
    let allCards = response.data.cards;
    let onlyMajorCards = allCards.filter((element) => element.type === "major");

    // EDITING THE CARDS TO MY LIKING
    let storeIn = onlyMajorCards.splice(-2, 1);
    storeIn[0].value = "0";
    onlyMajorCards.unshift(storeIn[0]);
    onlyMajorCards.find((element) =>
      element.name === "Fortitude" ? (element.name = "Strength") : null
    );
    onlyMajorCards.find((element) =>
      element.name === "The Last Judgment"
        ? (element.name = "Judgement")
        : null
    );
    let newMajorCards = onlyMajorCards;

    let mergedCards = [
      ...newMajorCards,
      ...allCards.filter((card) => card.type !== "major"),
    ];
    let minorMergedCards = mergedCards.filter(
      (element) => element.type === "minor"
    );

    minorMergedCards.find((element) => {
      if (["page", "knight", "queen", "king"].includes(element.value)) {
        element.category = "court";
      }
    });

    let faceMergedCards = minorMergedCards.filter(
      (element) => element.category
    );

    // NOW ADDING IMAGES TO EVERY CARD

    mergedCards.forEach((card) => {
      if (card.type === "major" || card.type === "minor") {
        card.image = cardImageMapping[card.name] || null;
      }
    });

    if (searchTerm) {
      mergedCards = mergedCards.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setCards(mergedCards);
    setFilteredCards(mergedCards); // Initialize filteredCards with all cards
  }

  useEffect(() => {
    setTimeout(() => {
      let loadingBackground = document.querySelector(".loading__background")
      fetchCards();
      if (loadingBackground){
        loadingBackground.remove();
      }
    }, 2000);
  }, []);

  // Filter cards based on the selected filter value
  useEffect(() => {
    let filtered = cards;
    if (filter === "ALL") {
      mainSearchBar.value = "";
      filtered = cards
      console.log(filtered);
    } else if (filter === "MAJOR") {
      filtered = cards.filter((card) => card.type === "major");
    } else if (filter === "MINOR") {
      filtered = cards.filter((card) => card.type === "minor");
    } else if (filter === "FACE") {
      filtered = cards.filter((card) => card.category === "court");
    }
    setFilteredCards(filtered);
  }, [filter, cards]);

  useEffect(() => {
    if (query) {
      const filtered = cards.filter((card) =>
        card.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCards(filtered);
    }
  }, [query, cards]);

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  function singleCardSearch() {
    const searchBar = document.querySelector('.mainSearchBar');
    const searchBarValue = searchBar.value;
    navigate(`/main`);
    fetchCards(searchBarValue);
  }

  return (
    <>
        <div className="mainSearchBox">
            <input onKeyDown={(event) => {
              if (event.key === 'Enter'){
                singleCardSearch()
              }
            }} className="mainSearchBar" type="search" placeholder="Search a Card"/>
            <button onClick={singleCardSearch} className="mainsearchbarButton">Find</button>
        </div>
      <main>
        <div className="main__header">
          <h2>The Rider-Waite Smith Deck</h2>

          <select name="" id="filter" onChange={handleFilterChange}>
            <option value="">Null</option>
            <option value="ALL">All</option>
            <option value="MAJOR">Major Arcana</option>
            <option value="MINOR">Minor Arcana</option>
            <option value="FACE">Face Cards</option>
          </select>
        </div>

        <div className="loading__background">
            <FontAwesomeIcon icon="fa-solid fa-spinner" />
        </div>

        <div className="container">
          <div className="row">
            <div className="card__list">
              {filteredCards.map((card) => (
                <div key={card.name_short} className="card">
                  <figure className="card__img--wrapper">
                    <img
                      src={tarotBackDesign}
                      alt=""
                      className="tarot__frontimg"
                    />
                    <img src={card.image} alt="" className="tarot__backimg" />
                  </figure>

                  <p className="tarot__name">{card.name}</p>
                  <p className="tarot__category">{card.type.toUpperCase()}</p>
                  <p className="tarot__number">{card.value_int}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer toggleModal={toggleModal} />
    </>
  );
}

export default Main;

