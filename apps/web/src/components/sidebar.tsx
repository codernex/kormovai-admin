import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { TbBrandTabler } from "react-icons/tb";
import { navigation } from "./nav";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useSidebar } from "@/hooks/useSidebar";

export const Sidebar: React.FC = React.memo(() => {
  const naivagte = useNavigate();
  const path = useLocation().pathname.slice(1);

  const { isSidebarActive } = useSidebar();
  const sidebarVariants = {
    initial: { width: 250, opacity: 1, x: 0 },
    animate: {
      width: 250,
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      width: 80,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const titleVariant: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <AnimatePresence>
      <motion.aside
        className={cn(
          "px-6 border-r border-slate-700  py-4 relative text-neutral-600 dark:text-slate-300"
        )}
        variants={sidebarVariants}
        initial="initial"
        animate={isSidebarActive ? "animate" : "exit"}
      >
        <Link to="/" className="flex gap-x-2 items-center">
          <TbBrandTabler className="text-3xl" />
          {isSidebarActive && (
            <motion.h2
              variants={titleVariant}
              initial="initial"
              animate={isSidebarActive ? "animate" : "exit"}
              className="font-semibold"
            >
              Codernex
            </motion.h2>
          )}
        </Link>
        <Separator className="my-2 " />
        <nav>
          <ul className="space-y-4">
            {navigation.map((item, i) => {
              return (
                <div key={i}>
                  <div
                    className="cursor-pointer flex justify-between items-center"
                    onClick={() => {
                      naivagte(item.href);
                    }}
                  >
                    <div
                      className={cn(
                        "flex gap-x-2 w-full px-2 py-1 items-center",
                        path === item.href
                          ? "bg-slate-100 rounded-[5px] text-slate-700"
                          : ""
                      )}
                    >
                      <item.icon size={20} className="text-xl" />
                      {isSidebarActive && (
                        <p className="font-semibold">{item.title}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>
        </nav>
      </motion.aside>
    </AnimatePresence>
  );
});
