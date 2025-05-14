import React from "react";
import Home_first from "./Home/Home_first";
import FAQ from "./Home/FAQ/FAQ_Component.jsx";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Home_first />
      <FAQ />
      <Footer />
    </>
  );
};

export default HomePage; 