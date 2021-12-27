import { Grid } from "@mui/material";
import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
};

export const ModalButtonGroup: VFC<Props> = memo((props) => {
  const { children } = props;
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{marginTop: "10px"}}>
      {children}
    </Grid>
  );
});
