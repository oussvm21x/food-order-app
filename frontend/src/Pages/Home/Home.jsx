import React from "react";
import "./Home.css";
import Hero from "../../Components/Hero/Hero";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import { useState } from "react";
import MenuDisplay from "../../Components/MenuDisplay/MenuDisplay";
import DownloadApp from "../../Components/donwloadApp/DownloadApp";

const Home = () => {
  const [categorie, setCategorie] = useState("All");

  return (
    <div className="pad">
      <Hero />
      <ExploreMenu categorie={categorie} setCategorie={setCategorie} />
      <MenuDisplay categorie={categorie} />
      <DownloadApp />
    </div>
  );
};

export default Home;
