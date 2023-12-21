import { useSidebar } from "@/hooks/useSidebar";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useSignOut } from "react-auth-kit";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { Button } from "./ui/button";
export const Navbar = React.memo(() => {
  const open = useSidebar((state) => state.open);
  const signOut = useSignOut();

  const logout = () => {
    signOut();
  };

  return (
    <nav className="flex justify-between px-4 items-center py-2 border-b border-slate-600 ">
      <div className="p-2 hover:bg-primary rounded duration-300 transition-colors hover:text-white  delay-150">
        <TbAdjustmentsHorizontal
          className="text-2xl cursor-pointer "
          onClick={() => open()}
        />
      </div>
      <div className="shadow-slate-500 shadow-sm dark:shadow-slate-200 rounded-full p-2 dark:bg-slate-600">
        <Popover>
          <PopoverTrigger className="w-full h-full" asChild>
            <span className="w-full h-full rounded-full flex items-center justify-center cursor-pointer">
              <AiOutlineUser size={20} />
            </span>
          </PopoverTrigger>
          <PopoverContent className="bg-white flex flex-col items-center h-[200px] justify-center">
            <Button
              onClick={() => logout()}
              className="flex items-center justify-center gap-x-3 text-white outline-none rounded-sm focus:outline-none border-none"
              variant={"secondary"}
            >
              <AiOutlineLogout /> <span>Logout</span>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
});
