import React from "react";
import "./Home.css";
import NavBar from "../../Components/NavBar/NavBar";
import Hero from "../../Components/Hero/Hero";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import { useState } from "react";
import MenuDisplay from "../../Components/MenuDisplay/MenuDisplay";
import DownloadApp from "../../Components/donwloadApp/DownloadApp";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  const [categorie, setCategorie] = useState("All");
  return (
    <div className="pad">
      <NavBar />
      <Hero />
      <ExploreMenu categorie={categorie} setCategorie={setCategorie} />
      <MenuDisplay categorie={categorie} />
      <DownloadApp />
      <Footer />
    </div>
  );
};

export default Home;
