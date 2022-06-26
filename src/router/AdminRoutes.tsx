import { ContactManagement } from "../component/pages/ContactManagement";
import { Page404 } from "../component/pages/Page404";

export const AdminRoutes = [
  {
    path: "/",
    exact: true,
    children: <ContactManagement />,
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />,
  },
];
