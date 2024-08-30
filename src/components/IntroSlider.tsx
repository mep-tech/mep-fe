import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const IntroSlider = ({ slides }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRef = useRef(null);
  const headerRef: any = useRef(null);
  const paragraphRef = useRef(null);
  const dotRefs: any = useRef([]);

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
    const headerParts: any = headerRef.current.children;
    const paragraph = paragraphRef.current;

    const fadeOutTimeline = gsap.timeline({ onComplete });

    fadeOutTimeline.to(image, {
      x: "-20%",
      opacity: 0,
      duration: 1,
      ease: "power4.in",
    });

    fadeOutTimeline.to(
      [headerParts, paragraph],
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
    const headerParts: any = headerRef.current.children;
    const paragraph = paragraphRef.current;

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

    gsap.fromTo(
      headerParts,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, delay: 0.5, ease: "power4.out" }
    );

    gsap.fromTo(
      paragraph,
      { y: 0, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, delay: 0.5, ease: "circ.inOut" }
    );

    return () => {
      gsap.killTweensOf([image, headerParts, paragraph]);
    };
  }, [currentIndex]);

  useEffect(() => {
    resetInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [slides.length]);

  return (
    <div className="flex items-center justify-center h-screen pl-10 pt-10 pb-0 overflow-hidden relative max-h-[calc(100vh_-_64px)]">
      <div className="flex flex-col items-start justify-center flex-1 space-y-4">
        <div
          ref={headerRef}
          className="text-5xl font-bold uppercase text-white"
        >
          {slides[currentIndex].header
            .split(", ")
            .map((word: string, index: number) => (
              <div key={index} className="my-3">
                {word}
              </div>
            ))}
        </div>
        <p ref={paragraphRef} className="text-lg text-background/70">
          {slides[currentIndex].paragraph}
        </p>

        <div className="absolute bottom-10 left-10 flex space-x-2 mt-4">
          {slides.map((_: any, index: number) => (
            <div
              key={index}
              ref={(el) => (dotRefs.current[index] = el)}
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

      <div className="flex-1 overflow-hidden">
        <img
          ref={imageRef}
          src={slides[currentIndex].image}
          alt="Slide"
          className="object-contain w-auto h-[70%]"
        />
      </div>
    </div>
  );
};

export default IntroSlider;
