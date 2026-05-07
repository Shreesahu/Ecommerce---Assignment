import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoutes";
import MainLayout from "./MainLayout";
import Home from "../RouteLevelPages/Home.jsx";
import Profile from "../RouteLevelPages/Profile.jsx";
import Login from "../RouteLevelPages/Login.jsx";
import SignUp from "../RouteLevelPages/SignUp.jsx";
import PublicRoute from "./PublicRoutes";
import Cart from "../RouteLevelPages/Cart.jsx";
import ProductDetails from "../RouteLevelPages/ProductDetails.jsx";
import MostBoughtProducts from "../Components/MostBoughtProducts.jsx";
import Wishlist from "../Components/Wishlist.jsx";
import OrderSuccess from "../RouteLevelPages/OrderSuccessCOD.jsx";
import Payment from "../RouteLevelPages/onlinePayment.jsx";
import TrackMyOrders from "../RouteLevelPages/TrackMyOrders.jsx";



export default function AppRoutes() {
  return (
    <BrowserRouter>
    <div id="recaptcha-container"></div> 
      <Routes>
          {/* //public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* protected wrapper */}
        <Route element={<ProtectedRoute />}>
         <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/most-bought" element={<MostBoughtProducts />}/>
          <Route path="/wishlist" element={<Wishlist />}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/order-success/:id" element={< OrderSuccess/>} />
          <Route path="/payment/:id" element={< Payment />} />
          <Route path="/track-my-orders" element={< TrackMyOrders  />} />
          
        </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}