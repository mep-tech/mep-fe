import { Box, Button, Skeleton, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Carousel, { CarouselRef } from "../../../components/Carousel";
import Title from "../../../components/Title";
import { getAllProjects, selectAllProjects } from "../../../store/slices/project.slice";
import gsap from "gsap";

const ProjectCard = ({
  position,
  project,
  onPrevious,
  onNext,
}: {
  position: number;
  project: any;
  onPrevious: () => void;
  onNext: () => void;
}) => {
  const { image, name, location, startDate, endDate } = project;
  const num = position < 10 ? `0${position}` : position.toString();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const period = useMemo(() => {
    const start = new Date(startDate).getFullYear();
    const end = endDate && new Date(endDate).getFullYear();
    if (!endDate || start === end) return start;
    return `${start} - ${end}`;
  }, [startDate, endDate]);

  return !isMobile ? (
    <div className="size-full flex flex-row">
      <div className="size-full max-w-[60%] lg:max-w-[42%] bg-secondary flex flex-row relative">
        <div className="text-white/25 text-[128px] font-bold my-auto m-4">{num}</div>
        <div className="px-4 py-8 grow flex flex-col justify-between gap-4 text-white">
          <div className="overflow-hidden w-[calc(100%_+_100px)] z-1">
            <p className="italic font-extralight px-[6px]">{period}</p>
            <Typography
              title="MOUNTAIN VIEW APARTMENT HOTEL GISOZI"
              component="h2"
              sx={{
                textShadow: (theme) => `
									4px 4px ${theme.palette.secondary.main},
									-4px -4px ${theme.palette.secondary.main},
									4px 0px ${theme.palette.secondary.main},
									-4px 0px ${theme.palette.secondary.main},
									4px -4px ${theme.palette.secondary.main},
									-4px 4px ${theme.palette.secondary.main},
									0px 4px ${theme.palette.secondary.main},
									0px -4px ${theme.palette.secondary.main}
								`,
              }}
              className="font-bold text-[44px] leading-tight line-clamp-3"
            >
              {name}
            </Typography>
          </div>

          <div className="flex flex-col grow">
            <div className="grow flex">
              <div className="mt-auto mb-8 max-w-[200px]">
                <img src="/map-pin.png" alt="map-pin" className="w-9 mb-2 opacity-50" />
                <p className="font-semibold leading-none">Located: {location}</p>
              </div>
            </div>
            <Button
              variant="outlined"
              color="inherit"
              className="capitalize text-base w-fit px-[60px] py-[14px] font-normal"
            >
              See More
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 -right-[26px] flex flex-col gap-4 text-white">
          <Button variant="contained" className="p-2 rounded-none shadow-none" onClick={onNext}>
            <MdOutlineKeyboardArrowRight size="36px" />
          </Button>
          <Button id="#nextButton" variant="contained" className="p-2 rounded-none shadow-none" onClick={onPrevious}>
            <MdOutlineKeyboardArrowLeft size="36px" />
          </Button>
        </div>
      </div>
      <div className="size-full grow bg-red-500">
        <img src={image} alt="project image" className="size-full object-cover" />
      </div>
    </div>
  ) : (
    <div></div>
  );
};

const Projects = () => {
  const dispatch = useDispatch<any>();
  const projects = useSelector(selectAllProjects);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const carouselRef = useRef<CarouselRef>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getAllProjects({ skip: 0, limit: 10 })).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);
  useLayoutEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 100, x: -100 },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 150%",
          end: "top 20%",
          scrub: true,
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 100, x: 100 },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 150%",
          end: "top 20%",
          scrub: true,
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      carouselContainerRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: carouselContainerRef.current,
          start: "top 150%",
          end: "top 20%",
          scrub: true,
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div
      ref={projectsContainerRef}
      id="projects"
      className="px-5 py-8 md:p-8 flex flex-col gap-8 relative overflow-hidden"
    >
      <Box
        component="img"
        src="/images/bg-3.png"
        className="size-full -z-10 absolute top-0 left-0 object-cover opacity-20"
      />
      <div className="w-full flex flex-row gap-4 justify-between items-center">
        <Title title="PROJECTS" ref={titleRef} />
        <Button
          ref={buttonRef}
          variant="contained"
          color="secondary"
          className="capitalize text-base w-fit px-10 font-normal"
        >
          View All
        </Button>
      </div>
      <div ref={carouselContainerRef} className="size-full h-[521px] relative">
        {!isLoading ? (
          <Carousel ref={carouselRef}>
            {projects.slice(0, 10).map((project, index) => (
              <ProjectCard
                onPrevious={() => carouselRef.current?.onPreviousClick()}
                onNext={() => carouselRef.current?.onNextClick()}
                key={project._id}
                position={index + 1}
                project={project}
              />
            ))}
          </Carousel>
        ) : (
          <Skeleton
            animation="wave"
            variant="rectangular"
            height="100%"
            width="100%"
            className="flex items-center justify-center font-bold text-3xl text-secondary"
          >
            Fetching Projects...
          </Skeleton>
        )}
      </div>
    </div>
  );
};

export default Projects;
