import {
  colors,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { memo, VFC } from "react";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import { useAuth } from "../../auth/LoginUser";
import { Header } from "../organisms/Header";
import { LoginAdmin } from "./LoginAdmin";
import { Box } from "@mui/system";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { SettingHome } from "../organisms/setting/SettingHome";
import { SettingProduct } from "../organisms/setting/SettingProduct";
import { ViewChart } from "../organisms/setting/ViewChart";
import { Page404 } from "./Page404";
import { SettingStaff } from "../organisms/setting/SettingStaff";

const drawerWidth = 240;
const currentLinkStyle = {
  color: colors.blue[800],
  textDecoration: "none",
  background: colors.grey[100],
  width: "100%",
  display: "inline-block",
};

const linkStyle = {
  color: "inherit",
  textDecoration: "none",
  width: "100%",
  display: "inline-block",
};

export const Setting: VFC = memo(() => {
  const signInUser = useAuth();
  const { id } = useParams<{ id: string }>();

  const settingContent = () => {
    switch (id) {
      case undefined:
        return <SettingHome />;
      case "product":
        return <SettingProduct />;
      case "staff":
        return <SettingStaff />;
      case "chart":
        return <ViewChart />;
      default:
        return <Page404 />;
    }
  };

  return (
    <>
      {signInUser.uid ? (
        <>
          <Box sx={{ display: "flex" }}>
            <Header />
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
            >
              <Toolbar />
              <Box sx={{ overflow: "auto" }}>
                <List>
                  <Link
                    to="/setting"
                    style={id === undefined ? currentLinkStyle : linkStyle}
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary={"設定"} />
                    </ListItem>
                  </Link>
                </List>
                <Divider />
                <List>
                  {["product", "staff", "chart"].map((text, index) => (
                    <Link
                      to={`/setting/${text}`}
                      style={id === text ? currentLinkStyle : linkStyle}
                      key={index}
                    >
                      <ListItem button key={index}>
                        <ListItemIcon>
                          {index === 0 && <PrecisionManufacturingIcon />}
                          {index === 1 && <AccountCircleIcon />}
                          {index === 2 && <InsertChartIcon />}
                        </ListItemIcon>
                        {index === 0 && <ListItemText primary="製品管理" />}
                        {index === 1 && <ListItemText primary="スタッフ管理" />}
                        {index === 2 && <ListItemText primary="統計" />}
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: "100%" }}>
              <Toolbar />
              {settingContent()}
            </Box>
          </Box>
        </>
      ) : (
        <LoginAdmin />
      )}
    </>
  );
});
