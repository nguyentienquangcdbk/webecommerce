import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import HomeLayout from "./layout/HomeLayout";
import AddNewProduct from "./pages/auth/AddNewProduct";
import AddNewCateogry from "./pages/auth/category/AddNewCateogry";
import EditCategory from "./pages/auth/category/EditCategory";
import ListCateogry from "./pages/auth/category/ListCateogry";
import EditProduct from "./pages/auth/EditProduct";
import ListProduct from "./pages/auth/ListProduct";
import DetailProduct from "./pages/DetailProduct";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useEffect } from "react";
import { useStore } from "./store/auth";
import axiosClient from "./api/axiosClient";
import Cart from "./pages/Cart";
import { useCart } from "./store/cart";
import CheackOut from "./pages/CheackOut";
import OrderAuth from "./pages/auth/order/OrderAuth";
import DetailOrder from "./pages/auth/order/DetailOrder";
import HomeAdmin from "./pages/auth/HomeAdmin";
function App() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const setItemCart = useCart((state) => state.setItemCart);
  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("token");
      if (token) {
        axiosClient
          .get("/me")
          .then((data) => {
            console.log(data);
            setUser(data?.data.user);
            setItemCart(data?.data?.user.cart.items);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
        <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
        <Route element={<HomeLayout></HomeLayout>}>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/products" element={<Products></Products>}></Route>
          <Route
            path="/products/:id"
            element={<DetailProduct></DetailProduct>}
          ></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/checkout" element={<CheackOut></CheackOut>}></Route>
        </Route>
        <Route element={<AdminLayout></AdminLayout>}>
          <Route path="/admin" element={<HomeAdmin></HomeAdmin>} />
          <Route path="/admin/product" element={<ListProduct></ListProduct>} />
          <Route path="/admin/order" element={<OrderAuth></OrderAuth>} />
          <Route
            path="/admin/order/edit/:id"
            element={<DetailOrder></DetailOrder>}
          />
          <Route
            path="/admin/product/add"
            element={<AddNewProduct></AddNewProduct>}
          />
          <Route
            path="/admin/product/edit/:id"
            element={<EditProduct></EditProduct>}
          />
          <Route
            path="/admin/category"
            element={<ListCateogry></ListCateogry>}
          />
          <Route
            path="/admin/category/add"
            element={<AddNewCateogry></AddNewCateogry>}
          />
          <Route
            path="/admin/category/edit/:id"
            element={<EditCategory></EditCategory>}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
