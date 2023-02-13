import { Logo } from "components";
import { Navbar } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <Navbar className="py-2 px-4 lg:px-8 lg:py-4 bg-slate-700">
      <div className="container mx-auto flex justify-center text-blue-gray-900">
        <Link to='/'>
          <Logo />
        </Link>
      </div>
    </Navbar>
  );
}
