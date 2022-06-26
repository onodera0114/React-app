import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { memo, VFC } from "react";
import { useAuth } from "../../auth/LoginUser";
import { MessageBox } from "../atoms/MessageBox";
import PersonIcon from '@mui/icons-material/Person';

type Props = {
  who: string;
  name: string;
  timestamp: string;
  message: string;
};

export const Message: VFC<Props> = memo((props) => {
  const { who, name, timestamp, message } = props;
  const signInUser = useAuth();

  return (
    <>
    {signInUser.uid ? (
      <Box
      sx={{ maxWidth: "300px", width: "100%", margin: who === "admin" ? "0 0 0 auto" : "0 0 0 60px", position: "relative" }}
    >
      {/* <Avatar sx={{ bgcolor: "#f00" }}><PersonIcon /></Avatar> */}
      {who === "customer" &&  <Avatar sx={{ bgcolor: "#f00", position: "absolute", left: "-55px", top: "30px" }}><PersonIcon /></Avatar> }
      {who === "customer" && <Typography>{name}</Typography>}
      <MessageBox who={who}>{message}</MessageBox>
      <Typography sx={{textAlign: "right"}}>{timestamp}</Typography>
    </Box>
    ) : (
      <Box
      sx={{ maxWidth: "300px", width: "100%", margin: who === "customer" ? "0 0 0 auto" : "0 0 0 60px", position: "relative" }}
    >
      {who === "admin" &&  <Avatar sx={{ bgcolor: "#f00", position: "absolute", left: "-55px", top: "30px" }}><PersonIcon /></Avatar> }
      {who === "admin" && <Typography>{name}</Typography>}
      <MessageBox who={who}>{message}</MessageBox>
      <Typography sx={{textAlign: "right"}}>{timestamp}</Typography>
    </Box>
    )}
    </>
  );
});
