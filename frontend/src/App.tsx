import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import VideoPlayer from "./pages/watch";
import { ShellLayout, SidebarLayout } from "./components/Layouts";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ShellLayout />}>
        <Route element={<SidebarLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="watch" element={<Navigate to="/" replace />} />
        <Route path="/watch/:id" element={<VideoPlayer />} />
      </Route>
    </Routes>
  );
}
