import Home from "../pages/Home/Homepage";
import Auth from "../pages/Auth/";
import ProductDetail from "../pages/ProductDetail";
import DefaultLayout from "../components/layout/DefaultLayout";

//Public
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/auth", component: Auth, Layout: null },
  { path: "/products/:slug", component: ProductDetail, Layout: DefaultLayout },
];

//Private
const privateRoute = [];

export { publicRoutes, privateRoute };
