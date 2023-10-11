import { useSidebar } from "@/hooks/useSidebar";
import { TbAdjustmentsHorizontal, TbMoonFilled } from "react-icons/tb";
import { useTheme } from "./theme-provider";
import React from "react";
export const Navbar = React.memo(() => {
  const open = useSidebar((state) => state.open);
  const { theme, setTheme } = useTheme();

  return (
    <nav className="flex justify-between px-4 items-center py-2 border-b border-slate-600 ">
      <div className="p-2 hover:bg-primary rounded duration-300 transition-colors hover:text-white  delay-150">
        <TbAdjustmentsHorizontal
          className="text-2xl cursor-pointer "
          onClick={() => open()}
        />
      </div>
      <div className="shadow-slate-500 shadow-sm dark:shadow-slate-200 rounded-full p-2 dark:bg-slate-600">
        <TbMoonFilled
          className="text-xl dark:text-white cursor-pointer  "
          onClick={() => {
            if (theme === "light") {
              setTheme("dark");
            } else if (theme === "dark") {
              setTheme("light");
            }
          }}
        />
      </div>
    </nav>
  );
});
