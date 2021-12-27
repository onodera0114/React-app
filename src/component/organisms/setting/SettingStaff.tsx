import { Typography } from "@mui/material";
import { memo, useEffect, VFC } from "react";
import { useAuth } from "../../../auth/LoginUser";
import { SettingGeneralAccount } from "./SettingGeneralAccount";
import { SettingMasterAccount } from "./SettingMasterAccount";

export const SettingStaff: VFC = memo(() => {
  const signInUser = useAuth();

  useEffect(() => {});
  return (
    <>
      <Typography sx={{ fontSize: "24px" }} align="center">
        スタッフ管理
      </Typography>
      {signInUser.uid === "FsorAe7EqCRpFNG1wmCqdcfkvFG3" ? (
        <SettingMasterAccount />
      ) : (
        <SettingGeneralAccount />
      )}
    </>
  );
});
