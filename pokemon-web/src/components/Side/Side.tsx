import { Button, Logo } from "components";
import { Link } from "react-router-dom";
import { FaHome, FaCog, FaSignOutAlt, FaTable } from "react-icons/fa";
import { IconButton, Typography } from "@mui/material";
import { MobileNav, Navbar } from "@material-tailwind/react";

export default function Sidebar() {
  return (
    <Navbar className="py-2 px-4 lg:px-8 lg:py-4 bg-slate-700">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Logo />
      </div>
    </Navbar>
  );
}
