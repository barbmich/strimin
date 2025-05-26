import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import WatchPage from "./pages/watch";
import { ShellLayout, SidebarLayout } from "./components/Layouts";
import UserPage from "./pages/user";
import SubscriptionsPage from "./pages/subscriptions";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ShellLayout />}>
        <Route element={<SidebarLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="watch" element={<Navigate to="/" replace />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="users/:id" element={<UserPage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
      </Route>
    </Routes>
  );
}
