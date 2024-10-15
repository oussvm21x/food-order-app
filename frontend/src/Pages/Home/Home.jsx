import React from "react";
import "./Home.css";
import NavBar from "../../Components/NavBar/NavBar";
import Hero from "../../Components/Hero/Hero";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import { useState } from "react";
import MenuDisplay from "../../Components/MenuDisplay/MenuDisplay";

const Home = () => {
  const [categorie, setCategorie] = useState("All");
  return (
    <div className="pad">
      <NavBar />
      <Hero />
      <ExploreMenu categorie={categorie} setCategorie={setCategorie} />
      <MenuDisplay categorie={categorie} />
    </div>
  );
};

export default Home;
