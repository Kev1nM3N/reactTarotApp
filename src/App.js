import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import cardImageMapping from "./cardImageMapping.js";
import Home from "./components/Home";
import Card from "./components/Card";
import Main from "./components/Main";
import Nav from "./components/Nav";
import Footer from "./components/Footer.jsx";

function App() {
  let [modalOpen, setModalOpen] = useState(false);
  function toggleModal (){
    if (modalOpen){
        setModalOpen(false)
        return document.body.classList.remove(`modal--open`);
    }
    setModalOpen(true)
    document.body.classList += ` modal--open`;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <section>
        <Nav toggleModal={toggleModal}/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/:id" element={<Card cardImageMapping={cardImageMapping} scrollToTop={scrollToTop}/>}/>
          <Route path="/search/:query" element={<Main toggleModal={toggleModal} scrollToTop={scrollToTop}
           cardImageMapping={cardImageMapping}/>} />
          <Route path="/main" element={<Main toggleModal={toggleModal}
           scrollToTop={scrollToTop} cardImageMapping={cardImageMapping} />}/>
        </Routes>
        <Footer toggleModal={toggleModal} scrollToTop={scrollToTop}/>
      </section>
    </Router>
  );
}

export default App;