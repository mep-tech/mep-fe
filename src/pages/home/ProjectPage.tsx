import { Box, Skeleton, Typography } from "@mui/material";
import clsx from "clsx";
import dayjs from "dayjs";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { ProjectActivityChip, ProjectActivityChipSkeleton } from "../../components/ProjectActivityChip";
import Title from "../../components/Title";
import TopBar from "../../components/TopBar";
import { getAllProjectActivities, selectAllProjectActivity } from "../../store/slices/activity.slice";
import { getAllProjectGalleries, selectAllProjectGalleries } from "../../store/slices/gallery.slice";
import { getProject, selectProjectById } from "../../store/slices/project.slice";
import { RootState } from "../../store/store";
import { ActivityType } from "../../types/activity.type";
import { GalleryType } from "../../types/gallery.type";
import { ProjectType } from "../../types/project.type";

const KeyText = ({ children }: { children: ReactNode }) => {
  return <h4 className="text-lg xs:text-xl font-bold text-center xs:text-right">{children}</h4>;
};
const ValueText = ({ children }: { children: ReactNode }) => {
  return <p className="mb-2 xs:mb-0 text-center xs:text-left">{children}</p>;
};

const ProjectPage = () => {
  const dispatch = useDispatch<any>();
  const { id } = useParams<{ id: string }>();
  const projectId: string = id!;
  const project = useSelector<RootState>((state) => selectProjectById(state, projectId)) as ProjectType;
  const activities = useSelector<RootState>(selectAllProjectActivity(projectId)) as ActivityType[];
  const gallery = useSelector<RootState>(selectAllProjectGalleries(projectId)) as GalleryType[];
  const [error, setError] = useState<string | null>(null);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [loadingGalleries, setLoadingGalleries] = useState(true);

  const period = useMemo(() => {
    if (!project) return "N/A";

    const start = dayjs(new Date(project.startDate)).format("MMM YYYY");
    const end = project.endDate && dayjs(new Date(project.endDate)).format("MMM YYYY");

    if (!end || start === end) return start;
    return `${start} - ${end}`;
  }, [project]);

  useEffect(() => {
    dispatch(getAllProjectGalleries({ projectId })).then(() => {
      setLoadingActivities(false);
    });
    dispatch(getAllProjectActivities({ projectId })).then(() => {
      setLoadingGalleries(false);
    });
  }, [dispatch, projectId]);
  useEffect(() => {
    if (!project) {
      dispatch(getProject({ projectId })).then(({ error }: any) => {
        if (error) setError(error.message);
      });
    }
  }, [project, dispatch, projectId]);

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
          <div className="p-4 sm:p-8 md:py-10 md:px-16 flex flex-col items-center">
            <BackButton className="mb-4 xs:mb-8 self-start" />

            {(project?.name || error) && (
              <Typography
                variant="h1"
                className={clsx(
                  "text-[24px] xs:text-[30px] md:text-[40px] text-center font-bold leading-normal",
                  error ? "text-red-500" : "text-white"
                )}
              >
                {project?.name || "Error fetching project!"}
              </Typography>
            )}
            {!project?.name && !error && (
              <Skeleton
                variant="text"
                width={700}
                className="bg-white/50 h-[24px] xs:h-[30px] md:h-[40px] block  max-w-full px-4"
              />
            )}

            {project && !error && (
              <div className="grid grid-cols-1 xs:grid-cols-2 xs:gap-4 my-8 text-white">
                <KeyText>Project Owner:</KeyText>
                <ValueText>{project.projectOwner}</ValueText>
                <KeyText>Owner's contact:</KeyText>
                <ValueText>{project.projectOwnerContact || "No contacts"}</ValueText>
                <KeyText>Period:</KeyText>
                <ValueText>{period}</ValueText>
                <KeyText>Location:</KeyText>
                <ValueText>{project.location}</ValueText>
                <KeyText>Added on:</KeyText>
                <ValueText>{dayjs(new Date(project.createdAt)).format("DD-MM-YYYY")}</ValueText>
              </div>
            )}
            {!project && !error && (
              <div className="flex flex-col gap-2 xs:gap-4 my-8 w-full items-center text-white max-w-full px-4">
                <Skeleton variant="text" width={270} height={20} className="bg-white/50 max-w-full" />
                <Skeleton variant="text" width={300} height={20} className="bg-white/50 max-w-full" />
                <Skeleton variant="text" width={250} height={20} className="bg-white/50 max-w-full" />
                <Skeleton variant="text" width={350} height={20} className="bg-white/50 max-w-full" />
                <Skeleton variant="text" width={250} height={20} className="bg-white/50 max-w-full" />
              </div>
            )}
            {error && (
              <div className="text-center max-w-[900px] p-8 mx-auto">
                <h3 className="text-red-500 font-medium text-lg md:text-xl mb-2 break-all">{error}</h3>
                <p className="text-white text-sm md:text-base">
                  An error occurred while fetching the project. Please try again or contact us if the issue persists.
                </p>
              </div>
            )}

            <Title size="small" title="Activities" color="common.white" className="text-[20px] mb-4 mx-auto" />
            <Box
              sx={{ scrollbarWidth: "none" }}
              className="max-w-min w-full flex flex-row gap-2 overflow-auto snap-x snap-mandatory"
            >
              {loadingActivities && Array.from({ length: 3 }).map((_, i) => <ProjectActivityChipSkeleton key={i} />)}
              {!loadingActivities &&
                activities?.length > 0 &&
                activities.map(({ _id, name, image }: any) => (
                  <ProjectActivityChip key={_id} name={name} image={image} />
                ))}
              {!loadingActivities && activities?.length <= 0 && <ProjectActivityChip name={"No activities found"} />}
            </Box>
          </div>
        </div>
      </div>

      <Title title="PROJECT GALLERY" className="my-8 mx-auto text-center" />
      {loadingGalleries || gallery.length > 0 ? (
        <div className="grow columns-1 lg:columns-2 3xl:columns-3 gap-4 md:gap-6 p-4 sm:p-8 md:py-10 md:px-16 w-full mx-auto *:mb-4 *:break-inside-avoid">
          {loadingGalleries && (
            <>
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Skeleton variant="rectangular" width="100%" height={100} />
              <Skeleton variant="rectangular" width="100%" height={85} />
              <Skeleton variant="rectangular" width="100%" height={100} />
              <Skeleton variant="rectangular" width="100%" height={300} />
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Skeleton variant="rectangular" width="100%" height={200} />
            </>
          )}
          {!loadingGalleries &&
            gallery.length > 0 &&
            gallery.map(({ _id, url }, index) => (
              <img key={_id} src={url} alt={`gallery ${index}`} className="w-full max-h-screen object-fit bg-white" />
            ))}
        </div>
      ) : (
        <div className="text-center max-w-[900px] w-full px-8 mb-16 mx-auto col-span-full">
          <h3 className="text-primary-foreground font-medium text-lg md:text-xl mb-2">No gallery images found!</h3>
          <p className="text-dark text-sm md:text-base">
            No gallery images found for this project. Please check back later.
          </p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProjectPage;
