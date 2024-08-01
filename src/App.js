import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import Card from "./components/Card";
import Main from "./components/Main";
import Nav from "./components/Nav";

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

  return (
    <Router>
      <section>
        <Nav toggleModal={toggleModal}/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path=":id" element={<Card />}/>
          <Route path="/search/:query" element={<Main />} />
          <Route path="/main" element={<Main toggleModal={toggleModal} />}/>
        </Routes>
      </section>
    </Router>
  );
}

export default App;
