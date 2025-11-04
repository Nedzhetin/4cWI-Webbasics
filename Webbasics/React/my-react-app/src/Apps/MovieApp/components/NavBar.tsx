import { Link } from "react-router-dom";


function NavBar() {
  return (
    <div>
      <nav className="z-10 fixed top-0 left-0 w-full h-16 bg-gray-800 text-white flex items-center justify-center space-x-4">
        <Link to={"/"} className=" fixed left-8 top-4 font-bold text-2xl">
          Movie App
        </Link>
        <div className="space-x-4 text-lg absolute right-8 top-5">
          <Link to={"/"}>Home</Link>
          <Link to={"/favorites"}>Favorites</Link>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
