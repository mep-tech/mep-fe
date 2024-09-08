import { Button } from "@mui/material";
import { BiChevronLeft } from "react-icons/bi";

const BackButton = ({
  onClick = () => window.history.back(),
}: {
  onClick?: () => void;
}) => {
  return (
    <Button
      startIcon={<BiChevronLeft />}
      className="bg-muted hover:bg-white rounded-full px-4 z-30 text-dark capitalize font-bold"
      sx={{
        "& .MuiButton-startIcon": {
          marginRight: 0,
        },
      }}
      onClick={onClick}
    >
      Back
    </Button>
  );
};

export default BackButton;
