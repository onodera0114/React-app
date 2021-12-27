import { Contact } from "../component/pages/Contact";
import { ContactComplete } from "../component/pages/ContactComplete";
import { Page404 } from "../component/pages/Page404";

export const UserRoutes = [
  {
    path: "/",
    exact: true,
    children: <Contact />,
  },
  {
    path: "/complete",
    exact: false,
    children: <ContactComplete />,
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />,
  },
];
