// import bannerimg from "../images/banner.jpg";
import { Link, NavLink } from "react-router-dom";
const Menubar = ( { user, signout } ) =>
{
 
  //
  return (
    <section className="py-5">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="w-[30%]">
            <ul className="flex">
              <li className="text-blue-400 text-xl">facebook</li>
              <li className="ml-2 text-xl text-green-600">Twitter</li>
              <li className="ml-2 text-xl text-blue-800">Linkden</li>
            </ul>
          </div>
          <div className=" w-[30%] text-center">
            <div>
              <img src="" alt="" />
            </div>
            <h1 className="text-2xl   font-bold">Blog website, You can creat blog here.</h1>

            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut temporibus voluptatem repellat tempore, iusto distinctio?
            </p>
          </div>
          <div className="w-[30%]">
            {user ? (
            <button onClick={signout} className="px-2 py-2 bg-red-400 text-white font-semibold">Log out</button>
            ) : (
              <Link to={"/login"} className="px-2 py-2 bg-blue-700 text-white">
                Login
              </Link>
            ) }
            {
              user?.uid ? <span className="px-2 py-2 border-2 rounded-sm border-solid border-green-400 ml-5">{user.displayName }</span>:""
            }
          </div>
        </div>
        <hr className=" mb-5" />
        <div className="text-center">
          <ul className="flex justify-center">
            <li className="mx-2">
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending
                    ? ""
                    : isActive
                    ? "px-2 py-2 bg-green-400 text-red-500"
                    : "px-2 py-2 bg-black text-white"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="mx-2">
              <NavLink
                to="/about"
                className={({ isActive, isPending }) =>
                  isPending
                    ? ""
                    : isActive
                    ? "px-2 py-2 bg-green-400 text-red-500"
                    : "px-2 py-2 bg-black text-white"
                }
              >
                About
              </NavLink>
            </li>
            <li className="mx-2">
              <NavLink
                to="/blog"
                className={({ isActive, isPending }) =>
                  isPending
                    ? ""
                    : isActive
                    ? "px-2 py-2 bg-green-400 text-red-500"
                    : "px-2 py-2 bg-black text-white"
                }
              >
                blog
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Menubar;
