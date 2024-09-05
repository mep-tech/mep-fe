import { Typography } from "@mui/material";

const Title = ({ title, ...props }: { title: string; [props: string]: any }) => {
  return (
    <Typography
      sx={{
        position: "relative",
        fontWeight: 700,
        fontSize: { xs: "32px", md: "40px" },
        lineHeight: "1.2",
        color: "common.black",
        zIndex: 1,
        width: "fit-content",
        pointerEvents: "none",
        userSelect: "none",
        "&::after": {
          content: "' '",
          position: "absolute",
          width: "88%",
          height: { xs: "10px", md: "12px" },
          bottom: "5px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "secondary.main",
          zIndex: -1,
        },
      }}
      {...props}
    >
      {title}
    </Typography>
  );
};

export default Title;
