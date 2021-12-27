import { Grid } from "@mui/material";
import { memo, VFC } from "react";
import { useAuth } from "../../auth/LoginUser";
import { useInquiryList } from "../../hooks/InquiryList";
import { TabBar } from "../molecules/TabBar";
import { Header } from "../organisms/Header";
import { InquiryCardList } from "../organisms/InquiryCardList";
import { LoginAdmin } from "./LoginAdmin";

export const ContactManagement: VFC = memo(() => {
  const signInUser = useAuth();
  const inquiryList = useInquiryList();

  return (
    <>
      {signInUser.uid ? (
        <>
          <Header />
          <TabBar />
          <Grid
            container
            spacing={3}
            sx={{ marginTop: "0", marginBottom: "20px", width: "100%" }}
            mx="auto"
          >
            {inquiryList.map((inquiry) => {
              return (
                <Grid item key={inquiry.docId}>
                  <InquiryCardList inquiry={inquiry} />
                </Grid>
              );
            })}
          </Grid>
        </>
      ) : (
        <LoginAdmin />
      )}
    </>
  );
});
