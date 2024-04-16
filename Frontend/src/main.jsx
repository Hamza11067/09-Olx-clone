import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AddProduct from "./components/AddProduct/AddProduct.jsx";
import Home from "./components/Home/Home.jsx";
import LikedProducts from "./components/LikedProducts/LikedProducts.jsx";
import Motors from "./components/Motors/Motors.jsx";
import Property from "./components/Property/Property.jsx";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import CategoryPage from "./components/Categories/CategoryPage.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";

// import { AddProduct, Home, Login, Motors, Property, Signup } from "./components/index.js";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="liked-products" element={<LikedProducts />} />
      <Route path="motors" element={<Motors />} />
      <Route path="property" element={<Property />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="add-product" element={<AddProduct />} />
      <Route path="product/:productId" element={<ProductDetails />} />
      <Route path="category/:categoryName" element={<CategoryPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
