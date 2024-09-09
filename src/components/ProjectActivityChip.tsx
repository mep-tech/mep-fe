import { Skeleton, Typography } from "@mui/material";
import { memo } from "react";

export const ProjectActivityChip = memo(({ image, name }: { image?: string; name: string }) => {
  return (
    <div className="bg-background rounded-full py-1 px-2 xs:py-2 xs:px-4 max-w-fit flex flex-row items-center gap-1 h-min min-w-max snap-start">
      {image && <img src={image} alt={`${name} activity`} className="size-4 xs:size-5 object-contain" />}
      <Typography variant="body2" className="font-xs xs:font-normal leading-normal">
        {name}
      </Typography>
    </div>
  );
});

export const ProjectActivityChipSkeleton = memo(() => {
  return <Skeleton variant="rounded" width={150} height={36} className="rounded-full bg-white/50"></Skeleton>;
});
