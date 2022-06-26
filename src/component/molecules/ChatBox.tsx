import { Box } from "@mui/system";
import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
};

export const ChatBox: VFC<Props> = memo((props) => {
  const { children } = props;
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        width: "100%",
      }}
    >
      <Box sx={{ maxWidth: "1000px", width: "100%", margin: "0 auto" }}>
        {children}
      </Box>
    </Box>
  );
});
