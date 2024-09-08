import { Button } from "@mui/material";
import clsx from "clsx";
import { BiChevronLeft } from "react-icons/bi";

const BackButton = ({
  onClick = () => window.history.back(),
  className,
  ...props
}: {
  onClick?: () => void;
  className?: string;
  [props: string]: any;
}) => {
  return (
    <Button
      startIcon={<BiChevronLeft />}
      className={clsx("bg-muted hover:bg-white rounded-full px-4 z-30 text-dark capitalize font-bold", className)}
      sx={{
        "& .MuiButton-startIcon": {
          marginRight: 0,
        },
      }}
      onClick={onClick}
      {...props}
    >
      Back
    </Button>
  );
};

export default BackButton;
