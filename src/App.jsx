import React from "react";
import "./App.css";
import About from "../src/component/about/about.jsx";
import FAQ from "../src/component/faq/faq.jsx";
import Footer from "./component/footer/footer.jsx";

function App() {
  return (
    <div className="App">
      <About />

      <FAQ />

      <Footer/>
    </div>
  );
}

export default App;
