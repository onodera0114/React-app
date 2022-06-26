import { Setting } from "../component/pages/Setting";
import { Page404 } from "../component/pages/Page404";

export const SettingRoutes = [
  {
    path: "/:id",
    exact: false,
    children: <Setting />,
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />,
  },
];
