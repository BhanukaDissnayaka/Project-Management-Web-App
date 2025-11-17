import BaseLayout from "@/layout/base.layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./auth.route";
import {
  authenticationRoutePaths,
  boardRoutePaths,
  protectedRoutePaths,
} from "./common/routes";
import AppLayout from "@/layout/app.layout";
import ProtectedRoute from "./protected.route";
import BoardLayout from "@/layout/board.layout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRoute />}>
          <Route element={<BaseLayout />}>
            {authenticationRoutePaths.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {protectedRoutePaths.map((route) => (
              <Route
                key={route?.path}
                path={route?.path}
                element={route?.element}
              />
            ))}
          </Route>
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route element={<BoardLayout />}>
              {boardRoutePaths.map((route) => (
                <Route
                  key={route?.path}
                  path={route?.path}
                  element={route?.element}
                />
              ))}
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
