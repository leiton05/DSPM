import { Link } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";

interface NavbarProp {
  title: string;
  imgUrl: string;
  alt: string;
}

function Navbar({ title, imgUrl, alt }: NavbarProp) {
  return (
    <div className="relative flex items-center justify-center px-4 py-4 sm:px-6">
      <Link to="/" className="absolute left-4 sm:left-6">
        <button className="px-4 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base">
          inicio
        </button>
      </Link>

      <div className="flex items-center">
        <img
          src={imgUrl}
          alt={alt}
          className="mr-2 w-12 sm:w-16 md:w-20 mr-4"
        />

        <h1 className="text-4xl font-bold sm:text-3xl md:text-5xl ml-4">
          {title}
        </h1>
      </div>

      <div className="absolute right-4 sm:right-6">
        <LogoutButton />
      </div>
    </div>
  );
}

export default Navbar;
