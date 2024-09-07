import { Typography } from "@mui/material";
import { forwardRef } from "react";

const Title = forwardRef(
  (
    {
      title,
      color,
      ...props
    }: {
      title: string;
      color?: "common.white" | "common.black" | "primary.main" | "secondary.main";
      [props: string]: any;
    },
    ref: any
  ) => {
    return (
      <Typography
        ref={ref}
        sx={{
          position: "relative",
          fontWeight: 700,
          fontSize: { xs: "32px", md: "40px" },
          lineHeight: "1.2",
          color: color,
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
  }
);

export default Title;
