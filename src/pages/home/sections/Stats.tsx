import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaProjectDiagram } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiCertificateFill } from "react-icons/pi";
import { TbAwardFilled } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    title: "Projects",
    icon: <FaProjectDiagram className="text-4xl text-white" />,
    count: "53",
  },
  {
    title: "Employees",
    icon: <FaPeopleGroup className="text-4xl text-white" />,
    count: "102",
  },
  {
    title: "Awards",
    icon: <TbAwardFilled className="text-4xl text-white" />,
    count: "06",
  },
  {
    title: "Certificates",
    icon: <PiCertificateFill className="text-4xl text-white" />,
    count: "12",
  },
];

const Stats = () => {
  const statsRef = useRef<any>([]);

  useEffect(() => {
    gsap.fromTo(
      statsRef.current,
      { opacity: 0, y: 50, scale: 0.5 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scale: 1,
        stagger: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 90%",
          end: "top 20%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div
      id="stats"
      className="stats-container"
    >
      <div className="container mx-auto py-20 px-5">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (statsRef.current[index] = el)}
              className="flex flex-col items-center gap-2 justify-center bg-white md:bg-opacity-0 bg-opacity-10 p-4 rounded-lg z-10"
            >
              <div className="bg-secondary aspect-square flex items-center rounded-full p-7">
                {stat.icon}
              </div>
              <h1 className="text-white text-5xl font-bold">{stat.count}</h1>
              <p className="text-white text-2xl">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
