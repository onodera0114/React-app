import { Card, CardContent } from "@mui/material";
import { memo, useState, VFC } from "react";
import { useAuth } from "../../auth/LoginUser";
import { inquiry } from "../../types/inquiry";
import { InquiryCardContent } from "../molecules/InquiryCardContent";
import { InquiryModalContent } from "../molecules/InquiryModalContent";

type Props = {
  inquiry: inquiry;
};

export const InquiryCardList: VFC<Props> = memo((props) => {
  const { inquiry } = props;
  const [open, setOpen] = useState(false);
  const signInUser = useAuth();

  const handleOpen = () => setOpen(true);

  return (
    <>
      <Card
        sx={{
          boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.35)",
          width: 320,
          backgroundColor:
            signInUser.email === inquiry.staff ? "#BDD7F2" : undefined,
          "&:hover": { cursor: "pointer" },
        }}
        onClick={handleOpen}
      >
        <CardContent>
          <InquiryCardContent inquiry={inquiry} />
        </CardContent>
      </Card>
      <InquiryModalContent inquiry={inquiry} open={open} setOpen={setOpen} />
    </>
  );
});
