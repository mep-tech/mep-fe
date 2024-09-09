import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import {
  ProjectActivityChip,
  ProjectActivityChipSkeleton,
} from "../../components/ProjectActivityChip";
import TopBar from "../../components/TopBar";
import {
  getAllActivities,
  selectAllActivities,
} from "../../store/slices/activity.slice";
import {
  getAllProjects,
  selectAllProjects,
} from "../../store/slices/project.slice";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({
  project,
  loadingActivities,
}: {
  project: any;
  loadingActivities: boolean;
}) => {
  const allActivities = useSelector(selectAllActivities);
  const { name, location, startDate, endDate, image } = project;
  const projectCardRef = useRef<HTMLDivElement>(null);

  const period = useMemo(() => {
    const start = dayjs(new Date(startDate)).format("MMM YYYY");
    const end = endDate && dayjs(new Date(endDate)).format("MMM YYYY");

    if (!end || start === end) return start;
    return `${start} - ${end}`;
  }, [startDate, endDate]);

  const activities = useMemo(() => {
    return allActivities.filter((activity) =>
      project.activities.includes(activity._id)
    );
  }, [allActivities, project.activities]);

  useLayoutEffect(() => {
    gsap.fromTo(
      projectCardRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4",
        scrollTrigger: projectCardRef.current,
      }
    );
  }, []);

  return (
    <Link to={`/projects/${project._id}`}>
      <div
        ref={projectCardRef}
        className="max-w-[550px] aspect-square p-[12px] xs:p-[18px] flex flex-col rounded-3xl overflow-hidden bg-white transition-shadow shadow-md hover:shadow-lg cursor-pointer"
      >
        <div className="size-full rounded-xl xs:rounded-2xl overflow-hidden">
          <img
            src={image}
            alt={name}
            className="size-full object-cover brightness-95 bg-background"
          />
        </div>
        <div className="grow">
          <div>
            <h2
              title={name}
              className="text-dark text-xl xs:text-2xl font-bold mt-2 truncate"
            >
              {name}
            </h2>
            <Box
              sx={{ scrollbarWidth: "none" }}
              className="my-3 xs:my-4 w-full flex flex-row gap-2 overflow-auto snap-x snap-mandatory"
            >
              {loadingActivities &&
                Array.from({ length: 3 }).map((_, i) => (
                  <ProjectActivityChipSkeleton key={i} setWhite={false} />
                ))}
              {!loadingActivities &&
                activities?.length > 0 &&
                activities.map(({ _id, name, image }: any) => (
                  <ProjectActivityChip key={_id} name={name} image={image} />
                ))}
              {!loadingActivities && activities?.length <= 0 && (
                <ProjectActivityChip name={"No activities found"} />
              )}
            </Box>
          </div>
          <div className="w-full h-[1.4px] bg-[#AAAAAA] rounded-full" />
          <div className="px-2 pt-2 xs:px-4 xs:pt-4 text-sm xs:text-base">
            <div className="mb-1 flex flex-row gap-2 items-center">
              <FaRegCalendarAlt />
              <p>{period}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <SlLocationPin />
              <p className="truncate">{location}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ProjectsPage = () => {
  const dispatch = useDispatch<any>();
  const projects = useSelector(selectAllProjects);
  const [loading, setLoading] = useState(true);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const topContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getAllProjects()).then(({ error }: any) => {
      setLoading(false);
      if (error) setError(error.message);
    });
    dispatch(getAllActivities()).then(() => {
      setLoadingActivities(false);
    });
  }, [dispatch]);
  useLayoutEffect(() => {
    gsap.fromTo(
      topContainerRef.current!.children,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.5,
        ease: "power4",
        stagger: -0.1,
        scrollTrigger: topContainerRef.current,
      }
    );
  }, []);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <div className="relative">
        <TopBar />
        <NavBar />
        <div className="w-full pt-[48px] md:pt-[64px] bg-primary-foreground/85">
          <img
            src="/images/projects-bg-top.png"
            alt="projects top image"
            className="size-full object-cover absolute top-0 bottom-0 -z-10 "
          />
          <div
            ref={topContainerRef}
            className="p-4 sm:p-8 md:py-10 md:px-16 flex flex-col items-center sm:items-start"
          >
            <BackButton className="mb-4 self-start" />
            <Typography
              variant="h1"
              className="text-white text-[32px] sm:text-[48px] md:text-[64px] font-bold leading-normal uppercase"
            >
              Projects
            </Typography>
            <Typography
              variant="body1"
              className="text-white text-sm sm:text-base md:text-xl"
            >
              Ibyo ukeneye byose turabikora
            </Typography>
          </div>
        </div>
      </div>

      {(loading || !error) && (
        <div className="grow grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 gap-4 md:gap-6 p-4 sm:p-8 md:py-10 md:px-16 mx-auto">
          {!loading &&
            projects.length > 0 &&
            projects.map((project: any) => (
              <ProjectCard
                key={project._id}
                project={project}
                loadingActivities={loadingActivities}
              />
            ))}
          {!loading && projects.length <= 0 && (
            <div className="text-center max-w-[900px] px-8 py-16 mx-auto col-span-full">
              <h3 className="text-primary-foreground font-medium text-lg md:text-xl mb-2">
                No projects found!
              </h3>
              <p className="text-dark text-sm md:text-base">
                We are currently working on new projects. Please check back
                later!
              </p>
            </div>
          )}
          {loading && (
            <div className="text-center max-w-[900px] px-8 py-16 mx-auto col-span-full">
              <h3 className="text-primary-foreground font-medium text-lg md:text-xl mb-2">
                Loading projects...
              </h3>
              <p className="text-dark text-sm md:text-base">
                Please wait while we fetch the projects for you!
              </p>
            </div>
          )}
        </div>
      )}
      {error && (
        <div className="text-center max-w-[900px] px-8 py-16 mx-auto">
          <h3 className="text-red-950 font-medium text-lg md:text-xl mb-2">
            Oooops! we were unable to fetch the desired content. Please refresh
            the page or contact us if the issue persist!
          </h3>
          <p className="text-red-500 text-sm md:text-base break-all">
            Error: {error}
          </p>
          <Button
            variant="outlined"
            color="error"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Click to Refresh
          </Button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProjectsPage;
