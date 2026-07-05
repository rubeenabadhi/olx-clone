import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import CategorySelect from "../pages/PostAd/CategorySelect";
import PostAdAttributes from "../pages/PostAd/PostAdAttributes";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import MyProducts from "../pages/MyProducts/MyProducts";
import Wishlist from "../pages/Wishlist/Wishlist";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/post" element={<CategorySelect />} />
      <Route path="/post/attributes" element={<PostAdAttributes />} />
      <Route path="/item/:id" element={<ProductDetails />} />
      <Route path="/my-products" element={<MyProducts />} />
      <Route path="/wishlist" element={<Wishlist />} />      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;