import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { memo, ReactNode, VFC } from "react";
import { useAuth } from "../../auth/LoginUser";

type Props = {
  who: string;
  children: ReactNode;
};

export const MessageBox: VFC<Props> = memo((props) => {
  const { who, children } = props;
  const signInUser = useAuth();

  return (
    <Box
      p={3}
      sx={signInUser.uid ? {
        position: "relative",
        padding: "17px 13px",
        borderRadius: "12px",
        backgroundColor: "#a8d3ff",
        whiteSpace: "pre-line",
        "::after": {
          position: "absolute",
          content: "''",
          top: "18px",
          border: "12px solid transparent",
          left: who === "admin" ? "" : "-23px",
          right: who === "admin" ? "-23px" : "",
          borderLeft: who === "admin" ? "12px solid #a8d3ff" : "",
          borderRight: who === "admin" ? "" : "12px solid #a8d3ff",
        },
      } : {
        position: "relative",
        padding: "17px 13px",
        borderRadius: "12px",
        backgroundColor: "#a8d3ff",
        whiteSpace: "pre-line",
        "::after": {
          position: "absolute",
          content: "''",
          top: "18px",
          border: "12px solid transparent",
          left: who === "customer" ? "" : "-23px",
          right: who === "customer" ? "-23px" : "",
          borderLeft: who === "customer" ? "12px solid #a8d3ff" : "",
          borderRight: who === "customer" ? "" : "12px solid #a8d3ff",
      }}
    }>
      <Typography>{children}</Typography>
    </Box>
  );
});
