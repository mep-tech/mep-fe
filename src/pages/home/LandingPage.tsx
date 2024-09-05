import React from "react";
import Footer from "../../components/Footer";
import TopBar from "../../components/TopBar";
import About from "./sections/About";
import Intro from "./sections/Intro";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import Testimonials from "./sections/Testimonials";
import WhyUs from "./sections/WhyUs";

const DualNavbar: React.FC = () => {
  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="max-w-[1440px] mx-auto">
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
