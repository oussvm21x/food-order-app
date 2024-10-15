import React from "react";
import "./Home.css";
import NavBar from "../../Components/NavBar/NavBar";
import Hero from "../../Components/Hero/Hero";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import { useState } from "react";

const Home = () => {
  const [categorie, setCategorie] = useState("All");
  return (
    <div className="pad">
      <NavBar />
      <Hero />
      <ExploreMenu categorie={categorie} setCategorie={setCategorie} />
    </div>
  );
};

export default Home;
