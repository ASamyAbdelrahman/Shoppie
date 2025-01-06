import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();

  return (
    <header className="fixed top-0 left-0 right-0 h-[11vh] flex items-center justify-center opacity-100 z-[200] blur-effect-theme">
      <div className="nike-container">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="text-3xl font-poppins font-bold text-slate-950 items-center space-x-2 flex"
          >
            Shoppie
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            {user && (
              <Link
                to={"/cart"}
                className="relative group text-slate-950 hover:text-[#1b4ce0] transition duration-400 
							ease-in-out"
              >
                <ShoppingCart
                  className="inline-block mr-1 group-hover:text-[#1b4ce0]"
                  size={20}
                />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span
                    className="absolute -top-2 -left-2 bg-theme text-white rounded-full px-2 py-0.5 
									text-xs group-hover:bg-[#1b4ce0] transition duration-300 ease-in-out"
                  >
                    {cart.length}
                  </span>
                )}
              </Link>
            )}
            {isAdmin && (
              <Link
                className="bg-theme hover:bg-theme-hover text-white px-2 py-2 rounded-lg font-medium
								 transition duration-300 ease-in-out flex items-center"
                to={"/secret-dashboard"}
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out"
                onClick={logout}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="font-poppins bg-theme hover:bg-red-700 text-white py-2 px-4 
									rounded-lg flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="font-poppins bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
									rounded-lg flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
