import NavBar from "../../../components/NavBar";
import IntroSlider from "../../../components/IntroSlider";

const slides = [
  {
    image: "/images/worker2.png",
    header:
      "Innovative Electrical and Mechanical Solutions for a Better Future",
    paragraph:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis culpa non fugiat placeat perspiciatis saepe dolore veniam eum beatae consectetur voluptate, voluptatem cupiditate, ipsa facere aut repellendus tempora hic magnam?",
  },
  {
    image: "/images/worker3.png",
    header:
      "Precision Engineering Services That Enhance and Empower Everyday Life",
    paragraph:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis culpa non fugiat placeat perspiciatis saepe dolore veniam eum beatae consectetur voluptate, voluptatem cupiditate, ipsa facere aut repellendus tempora hic magnam?",
  },
  {
    image: "/images/worker4.png",
    header:
      "Expertly Crafted Systems Designed to Meet Your Unique Needs",
    paragraph:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis culpa non fugiat placeat perspiciatis saepe dolore veniam eum beatae consectetur voluptate, voluptatem cupiditate, ipsa facere aut repellendus tempora hic magnam?",
  },
];

const Intro = ({ scrollToSection }: any) => {
  return (
    <div
      id="home"
      className="md:h-[calc(100vh_-_64px)] h-screen min-h-[500px] relative"
      style={{
        background: "url(/images/bg-1.jpg), linear-gradient(#1d2a37, #1d2a37)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "overlay",
      }}
    >
      <NavBar scrollToSection={scrollToSection} />
      <IntroSlider slides={slides} />
    </div>
  );
};

export default Intro;
