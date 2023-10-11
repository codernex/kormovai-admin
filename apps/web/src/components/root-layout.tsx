import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import React from "react";
import { Navbar } from "./navbar";

export const RootLayout = React.memo(() => {
  return (
    <div className="w-full h-full min-h-screen flex scrollbar-hide">
      <Sidebar />
      <div className="flex-1 w-full scrollbar-hide">
        <Navbar />
        <div className="overflow-y-scroll scrollbar-hide px-4 py-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
});
