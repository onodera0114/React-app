import { Grid, GridSize, Typography } from "@mui/material";
import { memo, VFC } from "react";

type Props = {
  size?: boolean | GridSize | undefined;
  label: string;
  data: string;
  id?: string;
}

export const InquiryCardUnit:VFC<Props> = memo((props) => {
  const { size, label, data, id="" } = props;

  return (
    <Grid item xs={size}>
      <Grid sx={{ borderBottom: "1px solid #1976d2" }}><Typography sx={{color: "#1976d2", fontSize: "18px", fontWeight: "bold"}}>{label}</Typography></Grid>
      <Grid sx={id === "text" ? {whiteSpace: "pre-line"} : {}}>{data}</Grid>
    </Grid>
  );
});
