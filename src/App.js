import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import HomeLayout from "./layout/HomeLayout";

import DetailProduct from "./pages/DetailProduct";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
// import { useEffect } from "react";
import { useStore } from "./store/auth";
import Cart from "./pages/Cart";
import CheackOut from "./pages/CheackOut";

// import HomeAdmin from "./pages/auth/HomeAdmin";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "./firebase-app/firebase-config";
// import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useCart } from "./store/cart";
function App() {
  // const setUser = useStore((state) => state.setUser);
  // const user = useStore((state) => state.user);
  const itemCart = useCart((state) => state.itemCart);
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const docRef = query(
  //         collection(db, "users"),
  //         where("email", "==", user.email)
  //       );
  //       onSnapshot(docRef, (snapshot) => {
  //         snapshot.forEach((doc) => {
  //           setUser({
  //             ...user,
  //             ...doc.data(),
  //           });
  //         });
  //       });

  //       // console.log(user?.role);
  //     } else {
  //       setUser(null);
  //     }
  //   });
  // }, [itemCart]);

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
        <Route path="/admin" element={<AdminLayout></AdminLayout>}></Route>
      </Routes>
    </div>
  );
}

export default App;
