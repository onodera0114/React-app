import { Typography } from "@mui/material";
import { memo, VFC } from "react";

export const SettingHome: VFC = memo(() => {
  return (
    <>
      <Typography sx={{ fontSize: "24px" }} align="center">
        設定ページ
      </Typography>
    </>
  );
});
