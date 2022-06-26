import { ChatPage } from "../component/pages/ChatPage";
import { Page404 } from "../component/pages/Page404";

export const ChatRoutes = [
  {
    path: "/:id",
    exact: false,
    children: <ChatPage />,
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />,
  },
];
