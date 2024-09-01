import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@mui/material";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const leftImageRef = useRef<HTMLDivElement>(null);
  const purpleBoxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.fromTo(
      purpleBoxRef.current,
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: purpleBoxRef.current,
          start: "top 80%",
          end: "top -80%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      leftImageRef.current,
      { x: 200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: leftImageRef.current,
          start: "top 80%",
          end: "top 10%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      textRef.current,
      { y: 50, opacity: 0, x: -100 },
      {
        y: 0,
        x: 0,
        ease: "power4.out",
        opacity: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      buttonRef.current,
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 90%",
          end: "top 60%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div
      id="about"
      className="lg:h-[calc(100vh_-_64px)] h-fit py-8 min-h-[500px] flex lg:flex-row flex-col items-center gap-10 sm:px-10 px-5"
      style={{
        background:
          "url(/images/bg-2.jpg), linear-gradient(#ffffff9d, #ffffffd9)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "overlay",
      }}
    >
      <div
        className="bg-black/0 h-full lg:w-1/2 w-full relative lg:block hidden"
        ref={leftImageRef}
      >
        <div
          className="absolute w-[80%] aspect-[9/6] bg-primary left-1/2 transform -translate-x-[45%] top-1/2 -translate-y-[55%]"
          ref={purpleBoxRef}
        ></div>
        <img
          src="/images/bg-1.jpg"
          alt="logo"
          className="absolute w-[80%] aspect-[9/6] bg-orange-600 left-1/2 transform -translate-x-[55%] top-1/2 -translate-y-[45%] object-cover"
        />
      </div>
      <div className="flex flex-col lg:w-1/2 w-full" ref={textRef}>
        <p className="text-secondary">About Us</p>
        <h1 className="text-4xl font-semibold text-dark mb-6">
          Welcome To MEP Erictric Technology Ltd
        </h1>
        <img
          src="/images/bg-1.jpg"
          alt="logo"
          className="w-full object-contain mb-4 block lg:hidden"
        />
        <p className="mb-4">
          We are a leading provider of Mechanical, Electrical, and Plumbing
          (MEP) services for various projects. Specializing in
          elevators/escalators, CCTV cameras, firefighting systems, and domestic
          electrical installations, the company emphasizes safety, security, and
          comfort in property management. Their skilled team stays ahead with
          the latest technology, ensuring optimal performance and compliance
          with regulatory standards. Committed to client satisfaction, MEP
          Electric Technology Ltd delivers innovative MEP solutions, completing
          projects on time and within budget.{" "}
        </p>
        <p className="">
          Prospective clients are invited to contact them for customized
          services tailored to specific project needs
        </p>
        <Button
          className="bg-secondary text-white capitalize text-base w-fit px-10 mt-10 font-normal"
          ref={buttonRef}
        >
          Read more
        </Button>
      </div>
    </div>
  );
};

export default About;
