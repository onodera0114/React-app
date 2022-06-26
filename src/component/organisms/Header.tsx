import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { memo, useCallback, useState, VFC } from "react";
import { signOutUser, useAuth } from "../../auth/LoginUser";
import { HeaderMenuList } from "../molecules/HeaderMenuList";

export const Header: VFC = memo(() => {
  const [open, setOpen] = useState<boolean>(false);
  const signInUser = useAuth();

  const onClickSignOut = useCallback(() => {
    signOutUser();
  }, []);

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {signInUser.uid && (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer open={open} onClose={toggleDrawer(false)} sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}>
                <HeaderMenuList setOpen={setOpen} />
              </Drawer>
            </>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Oshirisu
          </Typography>
          {signInUser.uid && (
            <Button color="inherit" onClick={onClickSignOut}>
              サインアウト
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
});
