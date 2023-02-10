import { Logo } from "components";
import { Navbar } from "@material-tailwind/react";

export default function Nav() {
  return (
    <Navbar className="py-2 px-4 lg:px-8 lg:py-4 bg-slate-700">
      <div className="container mx-auto flex justify-center text-blue-gray-900">
        <Logo />
      </div>
    </Navbar>
  );
}
