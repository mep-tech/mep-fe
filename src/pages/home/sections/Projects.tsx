import { Box, Button } from "@mui/material";
import Title from "../../../components/Title";

const ProjectCard = ({ position }: { position: number }) => {
  const num = position < 10 ? `0${position}` : position.toString();
  return (
    <div className="size-full h-[521px] flex flex-row">
      <div className="size-full grow max-w-[42%] bg-primary flex flex-row">
        <div className="text-white/25 text-[128px] font-bold my-auto">{num}</div>
        <div className="h-full grow"></div>
      </div>
      <div className="size-full grow bg-red-500"></div>
    </div>
  );
};

const Projects = () => {
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
      <ProjectCard position={1} />
    </div>
  );
};

export default Projects;
