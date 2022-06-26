import {
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import HomeIcon from "@mui/icons-material/Home";
import { Dispatch, memo, SetStateAction, VFC } from "react";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const HeaderMenuList: VFC<Props> = memo((props) => {
  const { setOpen } = props;
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link href={`/admin`} underline="none" color="inherit">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"お問い合わせ管理"} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link href={`/setting`} underline="none" color="inherit">
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
          <Link href={`/setting/${text}`} underline="none" color="inherit" key={index}>
            <ListItem button>
              <ListItemIcon>
                {index === 0 && <PrecisionManufacturingIcon />}
                {index === 1 && <AccountCircleIcon />}
                {index === 2 && <InsertChartIcon />}
              </ListItemIcon>
              {index === 0 && <ListItemText primary="製品管理" />}
              {index === 1 && <ListItemText primary="ユーザー管理" />}
              {index === 2 && <ListItemText primary="統計" />}
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
});
