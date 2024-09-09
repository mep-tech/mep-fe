import { Typography } from "@mui/material";
import { forwardRef } from "react";

const Title = forwardRef(
  (
    {
      title,
      color,
      size,
      ...props
    }: {
      title: string;
      color?: "common.white" | "common.black" | "primary.main" | "secondary.main";
      size?: "small" | "medium";
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
          fontSize: { xs: size === "small" ? "16px" : "32px", md: size === "small" ? "20px" : "40px" },
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
            height: { xs: size === "small" ? "5px" : "10px", md: size === "small" ? "7px" : "12px" },
            bottom: size === "small" ? "2px" : "5px",
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
