import { Navigate, Routes, Route } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Category } from "../Category/Category";
import { ProductDetail } from "../ProductDetail/ProductDetail";
import { Conversation } from "../Conversation/Conversation";
import { Chats } from "../Chats/Chats";
import { WriteReview } from "../WriteReview/WriteReview";
import { Favorites } from "../Favorites/Favorites";
import { UploadProduct } from "../UploadProduct/UploadProduct";
import { Profile } from "../Profile/Profile";
import { AdminUsers } from "../AdminUsers/AdminUsers";
import { AdminProducts } from "../AdminProducts/AdminProducts";
import { Register } from "../Register/Register";


export const Body: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category" element={<Category />} />
        <Route path="/productDetail" element={<ProductDetail />} />
        <Route path="/conversation" element={<Conversation />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/writeReview" element={<WriteReview/>} />
        <Route path="/favorites" element={<Favorites/>} />
        <Route path="/uploadProduct" element={<UploadProduct/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/adminusers" element={<AdminUsers/>} />
        <Route path="/adminproducts" element={<AdminProducts/>} />
      </Routes>
    </>
  );
};
