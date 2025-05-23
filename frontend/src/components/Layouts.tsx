import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function ShellLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export function SidebarLayout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
