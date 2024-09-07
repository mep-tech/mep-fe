import clsx from "clsx";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { forwardRef, ReactElement, useImperativeHandle, useLayoutEffect, useRef } from "react";

gsap.registerPlugin(Draggable);

export type CarouselRef = {
  onPreviousClick: () => void;
  onNextClick: () => void;
};

type CarouselProps = {
  children: ReactElement<any, string | React.JSXElementConstructor<any>>[];
  className?: string;
  [props: string]: any;
};

const Carousel = forwardRef<CarouselRef, CarouselProps>(
  ({ children, className, slideDelay = 3, slideDuration = 1, wrap = true, ...props }, ref) => {
    const animateSlides = useRef<(direction: number) => void>(() => {});

    useLayoutEffect(() => {
      const eventDisposable: any[] = [];

      const ctx = gsap.context(() => {
        const slidesContainerId = "#carousel-container";
        const slideClass = ".carousel-slide";
        const numSlides = children.length;
        const progressWrap = gsap.utils.wrap(0, 1);
        const wrapX = gsap.utils.wrap(-100, (numSlides - 1) * 100);

        const proxy = document.createElement("div");
        let slideWidth = 0;
        let wrapWidth = 0;

        let slideAnimation = gsap.to({}, {});

        const snapX = (value: number) => {
          const snapped = gsap.utils.snap(slideWidth, value);
          return wrap ? snapped : gsap.utils.clamp(-slideWidth * (numSlides - 1), 0, snapped);
        };
        animateSlides.current = (direction: number) => {
          timer.restart(true);
          slideAnimation.kill();
          const x = snapX(+gsap.getProperty(proxy, "x") + direction * slideWidth);

          slideAnimation = gsap.to(proxy, {
            x: x,
            duration: slideDuration,
            onUpdate: updateProgress,
          });
        };

        const autoPlay = () => {
          if (draggable.isPressed || draggable.isDragging || draggable.isThrowing) {
            timer.restart(true);
          } else {
            animateSlides.current(-1);
          }
        };
        const timer = gsap.delayedCall(slideDelay, autoPlay);

        const updateProgress = () => {
          animation.progress(progressWrap(+gsap.getProperty(proxy, "x") / wrapWidth));
        };
        function updateDraggable(this: any) {
          timer.restart(true);
          slideAnimation.kill();
          this.update();
        }
        const resize = () => {
          const norm = +gsap.getProperty(proxy, "x") / wrapWidth || 0;

          slideWidth = document.querySelectorAll<HTMLElement>(slideClass)[0].offsetWidth;
          wrapWidth = slideWidth * numSlides;

          if (wrap) {
            draggable.applyBounds({ minX: -slideWidth * (numSlides - 1), maxX: 0 });
          }

          gsap.set(proxy, {
            x: norm * wrapWidth,
          });

          animateSlides.current(0);
          slideAnimation.progress(1);
        };

        // Make slides position horizontally concurrently
        gsap.set(slideClass, {
          xPercent: (i) => i * 100,
        });

        // Creates an animation that moves slides horizontally by their total width
        // and repeats infinitely and wraps position
        const animation = gsap.to(slideClass, {
          xPercent: "+=" + numSlides * 100,
          duration: 1,
          ease: "none",
          paused: true,
          repeat: -1,
          modifiers: {
            xPercent: wrapX,
          },
        });

        const draggable = new Draggable(proxy, {
          trigger: slidesContainerId,
          onPress: updateDraggable,
          onDrag: updateProgress,
          onThrowUpdate: updateProgress,
          snap: {
            x: snapX,
          },
        });

        resize();

        eventDisposable.push(window.addEventListener("resize", resize));
      });

      return () => {
        eventDisposable.forEach((event) => {
          event?.removeEventListener("resize");
        });
        ctx.revert();
      };
    }, [children, slideDelay, slideDuration, wrap]);

    useImperativeHandle(ref, () => ({
      onPreviousClick: () => animateSlides.current(-1),
      onNextClick: () => animateSlides.current(1),
    }));

    return (
      <div id="carousel-container" className={clsx("size-full overflow-hidden flex-1", className)} {...props}>
        <div id="carousel-inner" className={"size-full overflow-hidden relative"}>
          {children.map((slides, index) => {
            return (
              <div key={index} className="size-full absolute top-0 left-0 carousel-slide">
                {slides}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default Carousel;
