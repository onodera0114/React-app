import { memo, VFC } from "react";
import { Route, Switch } from "react-router";
import { ChatPage } from "../component/pages/ChatPage";
import { Contact } from "../component/pages/Contact";
import { ContactManagement } from "../component/pages/ContactManagement";
import { Page404 } from "../component/pages/Page404";
import { Setting } from "../component/pages/Setting";
import { AdminRoutes } from "./AdminRoutes";
import { ChatRoutes } from "./ChatRoutes";
import { SettingRoutes } from "./SettingRoutes";
import { UserRoutes } from "./UserRoutes";

export const Router: VFC = memo(() => {
  return (
    <Switch>
      <Route exact path="/">
        <Contact />
      </Route>
      <Route
        path="/contact"
        render={({ match: { url } }) => (
          <Switch>
            {UserRoutes.map((route) => (
              <Route
                key={route.path}
                exact={route.exact}
                path={`${url}${route.path}`}
              >
                {route.children}
              </Route>
            ))}
          </Switch>
        )}
      ></Route>
      <Route exact path="/admin">
        <ContactManagement />
      </Route>
      <Route
        path="/admin"
        render={({ match: { url } }) => (
          <Switch>
            {AdminRoutes.map((route) => (
              <Route
                key={route.path}
                exact={route.exact}
                path={`${url}${route.path}`}
              >
                {route.children}
              </Route>
            ))}
          </Switch>
        )}
      ></Route>
      <Route exact path="/chat">
        <ChatPage />
      </Route>
      <Route
        path="/chat"
        render={({ match: { url } }) => (
          <Switch>
            {ChatRoutes.map((route) => (
              <Route
                key={route.path}
                exact={route.exact}
                path={`${url}${route.path}`}
              >
                {route.children}
              </Route>
            ))}
          </Switch>
        )}
      ></Route>
      <Route exact path="/setting">
        <Setting />
      </Route>
      <Route
        path="/setting"
        render={({ match: { url } }) => (
          <Switch>
            {SettingRoutes.map((route) => (
              <Route
                key={route.path}
                exact={route.exact}
                path={`${url}${route.path}`}
              >
                {route.children}
              </Route>
            ))}
          </Switch>
        )}
      ></Route>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
});
