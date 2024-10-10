import React from "react";
import TopBar from "../../components/TopBar";
import About from "./sections/About";
import Intro from "./sections/Intro";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import Testimonials from "./sections/Testimonials";
import Stats from "./sections/Stats";
import WhyUs from "./sections/WhyUs";
import Footer from "../../components/Footer";
import Solutions from "./sections/Solutions";

const DualNavbar: React.FC = () => {
  return (
    <div className="mx-auto">
      <TopBar />
      <Intro />
      <About />
      <Stats />
      <Solutions />
      <Services />
      <WhyUs />
      <Projects />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default DualNavbar;
