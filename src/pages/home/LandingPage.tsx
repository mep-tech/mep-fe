import React from "react";
import Intro from "./sections/Intro";
import About from "./sections/About";
import TopBar from "../../components/TopBar";
import Services from "./sections/Services";
import WhyUs from "./sections/WhyUs";
import Projects from "./sections/Projects";
import Testimonials from "./sections/Testimonials";
import Footer from "../../components/Footer";

const DualNavbar: React.FC = () => {
  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <TopBar />
      <Intro scrollToSection={scrollToSection} />
      <About />
      <Services />
      <WhyUs />
      <Projects />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default DualNavbar;
