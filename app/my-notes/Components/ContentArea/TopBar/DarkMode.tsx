"use client";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState } from "react";
import { useGlobalContext } from "@/ContextApi";
function DarkMode() {
  const {
    darkModeObject: { darkMode, setDarkMode },
  } = useGlobalContext();

  function handleClickedDarkMode(index: number) {
    const updateDarkModeObject = darkMode.map((item, i) => {
      if (i === index) {
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    });
    setDarkMode(updateDarkModeObject);
  }
  return (
    <div
      className={` ${darkMode[1].isSelected ? "bg-slate-700" : "bg-slate-100"}  h-[36px]  w-[74px] rounded-3xl flex items-center gap-2 pl-[5px]`}
    >
      {darkMode.map((item, index) => {
        return (
          <div
            className={` ${item.isSelected ? "bg-[#0083bb] text-white" : "  text-[#0083bb]"} 
          
            w-7 h-7 flex items-center justify-center rounded-full top-[4px] p-1 left-1 cursor-pointer select-none`}
            key={index}
            onClick={() => handleClickedDarkMode(index)}
          >
            {item.icon}
          </div>
        );
      })}
    </div>
  );
}

export default DarkMode;
