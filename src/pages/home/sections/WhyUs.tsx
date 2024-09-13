import React, { useEffect } from "react";
import WhyUsCard from "../../../components/WhyUsCard";
import { Button } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Title from "../../../components/Title";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    title: "Quality Services",
    description:
      "Our team has extensive experience in MEP systems design, installation, and maintenance, ensuring that our clients receive professional and reliable services",
    image: "/images/briefcase.png",
  },
  {
    title: "Experienced Team",
    description:
      "We have been in the industry for over 10 years. We have worked with many clients and have gained a lot of experience.",
    image: "/images/sustainable.png",
  },
  {
    title: "Innovative Ideas",
    description:
      "We are always looking for new ways to improve our services. We are constantly innovating and coming up with new ideas.",
    image: "/images/customer-service.png",
  },
  {
    title: "Customer Service",
    description:
      "We provide excellent customer service to our clients. We are always available to answer any questions or concerns.",
    image: "/images/quality-service.png",
  },
  {
    title: "Affordable Services",
    description:
      "Our team has extensive experience in MEP systems design, installation, and maintenance, ensuring that our clients receive professional and reliable services.",
    image: "/images/innovative.png",
  },
];

const WhyUs: React.FC = () => {
  const navigate = useNavigate();
  const introRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  // const reasonsRef = React.useRef<HTMLDivElement[]>([]);
  const cardsContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        introRef.current,
        { opacity: 0, y: 100, x: 100 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 150%",
            end: "top 20%",
            scrub: true,
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
        }
      );

      ScrollTrigger.create({
        animation: gsap.fromTo(
          buttonRef.current,
          { opacity: 0, y: 0, scale: 0.5 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scale: 1,
            stagger: 0.3,
            ease: "power4.out",
          }
        ),
        trigger: buttonRef.current,
        start: "top 150%",
        end: "top 50%",
        toggleActions: "play none none none",
        scrub: true,
      });

      // reasonsRef.current.forEach((reason, index) => {
      //   gsap.fromTo(
      //     reason,
      //     { opacity: 0, scale: 0.7, y: 50 },
      //     {
      //       opacity: 1,
      //       y: 0,
      //       scale: 1,
      //       duration: 1,
      //       scrollTrigger: {
      //         trigger: reason,
      //         start: "top 90%",
      //         end: "top 50%",
      //         scrub: true,
      //         toggleActions: "play none none none",
      //       },
      //       delay: index * 0.02,
      //     }
      //   );
      // });
    });

    if (cardsContainerRef.current?.children) {
      gsap.utils
        .toArray(cardsContainerRef.current.children)
        .forEach((child) => {
          gsap.fromTo(
            child as HTMLElement,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              delay: 0.5,
              scrollTrigger: {
                trigger: child as HTMLElement,
                start: "top 100%",
                end: "top 50%",
                scrub: 1,
              },
            }
          );
        });
    }

    return () => ctx.clear();
  }, []);

  return (
    <div
      id="why-us"
      className="h-fit py-10 flex items-center image-container overflow-hidden"
    >
      <div
        ref={cardsContainerRef}
        className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-10 gap-4 lg:px-16 px-4 z-10"
      >
        <div ref={introRef} className="text-white">
          <h2 className="text-4xl font-bold uppercase"></h2>
          <Title
            title="Why Choose Us?"
            color="common.white"
            className="uppercase"
          />
          <p className="sm:text-lg text-base mt-4">
            We are a team of professionals who are dedicated to providing the
            best services to our clients. Here are some reasons why you should
            choose us.
          </p>
          <Button
            className="bg-secondary text-white capitalize text-base w-fit px-14 py-4 mt-10 font-normal"
            ref={buttonRef}
            onClick={() => {
              navigate("/about/#team");
            }}
          >
            Meet our team
          </Button>
        </div>
        {reasons.map((reason, index) => (
          <WhyUsCard
            key={index}
            title={reason.title}
            description={reason.description}
            image={reason.image}
            className=""
            // ref={(el: any) => (reasonsRef.current[index] = el!)}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
