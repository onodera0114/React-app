import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { VFC, memo } from "react";
import { useRecoilState } from "recoil";
import { userSettingState } from "../../store/adminUser";


export const TabBar: VFC = memo(() => {
  const [userSetting, setUserSetting] = useRecoilState(userSettingState);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setUserSetting({
      ...userSetting,
      status: newValue
    });
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", marginTop: "64px" }}>
      <Tabs value={userSetting.status} onChange={handleChange} centered>
        <Tab value="未対応" label="未対応" />
        <Tab value="対応中" label="対応中" />
        <Tab value="対応済み" label="対応済み" />
      </Tabs>
    </Box>
  );
});
