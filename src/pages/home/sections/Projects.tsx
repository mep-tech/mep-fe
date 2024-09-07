import { Box, Button, Skeleton, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../../components/Title";
import { getAllProjects, selectAllProjects } from "../../../store/slices/project.slice";
import Carousel, { CarouselRef } from "../../../components/Carousel";

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
  const num = position < 10 ? `0${position}` : position.toString();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return !isMobile ? (
    <div className="size-full flex flex-row">
      <div className="size-full max-w-[60%] lg:max-w-[42%] bg-secondary flex flex-row relative">
        <div className="text-white/25 text-[128px] font-bold my-auto m-4">{num}</div>
        <div className="px-4 py-8 grow flex flex-col justify-between gap-4 text-white">
          <div className="overflow-hidden w-[calc(100%_+_100px)] z-1">
            <p className="italic font-extralight px-[6px]">2019 - 2020</p>
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
              MOUNTAIN VIEW APARTMENT HOTEL GISOZI
            </Typography>
          </div>

          <div className="flex flex-col grow">
            <div className="grow flex">
              <div className="my-auto">
                <img src="/map-pin.png" alt="map-pin" className="w-9 mb-2 opacity-50" />
                <p className="font-semibold leading-none">Kigali, Gasabo, Gisozi</p>
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
        <img src="/images/bg-1.jpg" alt="project-1" className="size-full object-cover" />
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

  useEffect(() => {
    dispatch(getAllProjects({ skip: 0, limit: 10 })).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  return (
    <div id="projects" className="px-5 py-8 md:p-8 flex flex-col gap-8 relative">
      <Box
        component="img"
        src="/images/bg-3.png"
        className="size-full -z-10 absolute top-0 left-0 object-cover opacity-20"
      />
      <div className="w-full flex flex-row gap-4 justify-between items-center">
        <Title title="PROJECTS" />
        <Button variant="contained" color="secondary" className="capitalize text-base w-fit px-10 font-normal">
          View All
        </Button>
      </div>
      <div className="size-full h-[521px] relative">
        {!isLoading ? (
          <Carousel>
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
