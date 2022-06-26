import { Box } from "@mui/system";
import { memo, VFC } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Header } from "../organisms/Header";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { inquiryState } from "../../store/inquiry";


export const ContactComplete: VFC = memo(() => {
  const inquiry = useRecoilValue(inquiryState);
  const history = useHistory();
  const location = useLocation();
  if(!location.state){
    history.replace("/");
  }

  return (
    <>
      <Header />
      <Box sx={{ marginTop: "64px" }}>
        <Typography sx={{ fontSize: "25px", textAlign: "center" }}>
          送信完了ページ
        </Typography>
        <Typography
          sx={{ fontSize: "18px", marginTop: "20px", textAlign: "center" }}
        >
          お問い合わせが送信されました
        </Typography>
        <Card
          variant="outlined"
          sx={{ margin: "0 auto", maxWidth: "750px", width: "100%" }}
        >
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid  sx={{ borderBottom: "1px solid #1976d2" }} xs={6}>
                  <Typography
                    sx={{
                      color: "#1976d2",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    名前
                  </Typography>
                </Grid>
                <Grid xs={12}>{inquiry.name}</Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid  sx={{ borderBottom: "1px solid #1976d2" }} xs={6}>
                  <Typography
                    sx={{
                      color: "#1976d2",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    メールアドレス
                  </Typography>
                </Grid>
                <Grid xs={12}>{inquiry.email}</Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid  sx={{ borderBottom: "1px solid #1976d2" }} xs={6}>
                  <Typography
                    sx={{
                      color: "#1976d2",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    電話番号
                  </Typography>
                </Grid>
                <Grid xs={12}>{inquiry.phone}</Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid  sx={{ borderBottom: "1px solid #1976d2" }} xs={6}>
                  <Typography
                    sx={{
                      color: "#1976d2",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    製品番号
                  </Typography>
                </Grid>
                <Grid xs={12}>{inquiry.product.ModelNumber}</Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid  sx={{ borderBottom: "1px solid #1976d2" }} xs={6}>
                  <Typography
                    sx={{
                      color: "#1976d2",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    お問い合わせ内容
                  </Typography>
                </Grid>
                <Grid xs={12}>{inquiry.text}</Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Typography>チャットページは<Link to={`/chat/${inquiry.docId}`}>こちら</Link>から</Typography>
      </Box>
    </>
  );
});
