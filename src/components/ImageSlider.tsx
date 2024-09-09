import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const ImageSlider = ({ images }: { images: any[] }) => {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const slider: any = sliderRef.current;
    const container = containerRef.current;
    const imageWidth: number = slider.offsetWidth / 3; // 3 images in view at once
    let animation: any = null;

    // Set up the infinite sliding animation using GSAP
    const createSliderAnimation = () => {
      animation = gsap.to(slider, {
        x: `-${imageWidth * images.length}px`, // Move left to the last image
        duration: images.length * 2, // Control the speed of the slider
        ease: "linear",
        repeat: -1, // Infinite loop
        modifiers: {
          x: gsap.utils.unitize(
            (x) => parseFloat(x) % (imageWidth * images.length)
          ), // Infinite loop logic
        },
      });
    };

    createSliderAnimation();

    // Make the slider draggable
    Draggable.create(slider, {
      type: "x",
      bounds: container,
      onDrag() {
        if (animation) animation.pause(); // Pause animation on drag
      },
      onDragEnd() {
        if (animation) animation.play(); // Resume animation after dragging
      },
    });

    return () => {
      if (animation) animation.kill(); // Clean up animation on unmount
    };
  }, [images]);

  return (
    <div className="overflow-hidden w-full" ref={containerRef}>
      <div
        className="flex w-full cursor-grab select-none"
        ref={sliderRef}
        style={{ width: `${images.length * 100}%` }} // Stretch the slider to fit all images
      >
        {images.map((img, index) => (
          <div key={index} className="w-1/3 flex-shrink-0 p-2">
            <img
              src={img.src}
              alt={`slider-img-${index}`}
              className="w-full !aspect-video object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
