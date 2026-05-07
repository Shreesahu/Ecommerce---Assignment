import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../ReduxSlice/user/auth&UserSlice";
import { ShoppingCart, User, Menu, X, Heart } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.currentUser);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalCartItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const totalWishlistItems = wishlistItems.length;

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold tracking-tight text-black">
          MyApp
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className="font-medium text-gray-700 transition hover:text-black"
          >
            Home
          </Link>
          <Link
            to="/most-bought"
            className="font-medium text-gray-700 transition hover:text-black"
          >
            Most Bought
          </Link>
          <Link
            to="/wishlist"
            className="relative flex items-center gap-2 font-medium text-gray-700 transition hover:text-black"
          >
            <Heart size={20} />
            Wishlist
            {totalWishlistItems > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
                {totalWishlistItems}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center gap-2 font-medium text-gray-700 transition hover:text-black"
          >
            <ShoppingCart size={20} />
            Cart
            {totalCartItems > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
                {totalCartItems}
              </span>
            )}
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-2 font-medium text-gray-700 transition hover:text-black"
          >
            <User size={18} />
            Profile
          </Link>
          \
          {user && (
            <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
              Hi, {user.full_name}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            Logout
          </button>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <nav className="flex flex-col gap-4 px-6 py-5">
            {/* HOME */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="font-medium text-gray-700"
            >
              Home
            </Link>

            <Link
              to="/most-bought"
              onClick={() => setMobileMenuOpen(false)}
              className="font-medium text-gray-700"
            >
              Most Bought
            </Link>

            <Link
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between font-medium text-gray-700"
            >
              <span>Wishlist</span>

              {totalWishlistItems > 0 && (
                <span className="rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between font-medium text-gray-700"
            >
              <span>Cart</span>

              {totalCartItems > 0 && (
                <span className="rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                  {totalCartItems}
                </span>
              )}
            </Link>

            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="font-medium text-gray-700"
            >
              Profile
            </Link>

            {user && (
              <div className="rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700">
                Hi, {user.full_name}
              </div>
            )}

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-4 py-3 font-semibold text-white"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
