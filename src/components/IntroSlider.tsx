import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const IntroSlider = ({ slides }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const dotRefs = useRef<HTMLDivElement[]>([]);
  const intervalRef = useRef<any | null>(null);

  const changeSlide = (newIndex: number) => {
    if (newIndex !== currentIndex) {
      fadeOutCurrentSlide(() => {
        setCurrentIndex(newIndex);
        resetInterval();
      });
    }
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      fadeOutCurrentSlide(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      });
    }, 7000);
  };

  const fadeOutCurrentSlide = (onComplete: () => void) => {
    const image = imageRef.current;
    const header = headerRef.current;
    const paragraph = paragraphRef.current;

    const fadeOutTimeline = gsap.timeline({ onComplete });

    fadeOutTimeline.to(image, {
      x: "-20%",
      opacity: 0,
      duration: 1,
      ease: "power4.in",
    });

    fadeOutTimeline.to(
      [header, paragraph],
      {
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      },
      "-=0.8"
    );
  };

  useEffect(() => {
    const image = imageRef.current;
    const header = headerRef.current;
    const paragraph = paragraphRef.current;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        image,
        { x: "100%", opacity: 0, scale: 0.2, y: "50%" },
        {
          x: "0%",
          opacity: 1,
          duration: 2,
          delay: 0.5,
          scale: 1,
          y: "0%",
          stagger: 0.4,
          ease: "power3.out",
        }
      );
    });

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        image,
        { x: "0%",
          opacity: 0, scale: 0.2, y: "50%" },
        {
          x: "0%",
          opacity: 1,
          duration: 2,
          delay: 0.5,
          scale: 1,
          y: "0%",
          stagger: 0.4,
          ease: "power3.out",
        }
      );
    });

    gsap.fromTo(
      header,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power4.out",
      }
    );

    gsap.fromTo(
      paragraph,
      { y: 0, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, delay: 0.5, ease: "circ.inOut" }
    );

    // return () => {
    //   gsap.killTweensOf([image, header, paragraph]);
    // };

    return () => mm.revert();
  }, [currentIndex]);

  useEffect(() => {
    resetInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [slides.length]);

  useEffect(() => {
    if (dotRefs.current.length) {
      gsap.fromTo(
        dotRefs.current,
        { opacity: 0.2, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 2,
          stagger: 0.1,
          ease: "power1.out",
        }
      );
    }
  }, [currentIndex]);

  return (
    <div className="flex md:flex-row flex-col items-center md:justify-center justify-around md:pl-10 xxs:px-6 px-2 pt-10 pb-0 overflow-hidden relative md:h-[calc(100vh_-_64px)] h-screen min-h-[500px]">
      <div className="flex flex-col md:items-start md:justify-center justify-end flex-1 space-y-4 lg:w-auto md:w-1/2 w-full pt-6 md:mb-0 mb-6">
        <div
          ref={headerRef}
          className="xl:text-5xl lg:text-4xl xs:text-3xl text-2xl font-bold uppercase text-white sm:text-left text-center"
        >
          {slides[currentIndex].header}
        </div>
        <p
          ref={paragraphRef}
          className="lg:text-lg sm:text-base text-sm text-background/70 sm:text-left text-center"
        >
          {slides[currentIndex].paragraph}
        </p>

        <div className="absolute bottom-10 left-10 space-x-2 mt-4 sm:flex hidden">
          {slides.map((_: any, index: number) => (
            <div
              key={index}
              ref={(el) => (dotRefs.current[index] = el!)}
              className={`h-3 w-3 rounded-full cursor-pointer ${
                index === currentIndex
                  ? "bg-secondary"
                  : "bg-transparent border border-background/50"
              }`}
              onClick={() => changeSlide(index)}
            ></div>
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-1 md:items-end items-center justify-end content-end overflow-hidden bg-fuchsia-600/0 h-full lg:w-auto md:w-1/2 w-full">
        <img
          ref={imageRef}
          src={slides[currentIndex].image}
          alt="Slide"
          className="object-contain w-auto max-h-full"
        />
      </div>
    </div>
  );
};

export default IntroSlider;
