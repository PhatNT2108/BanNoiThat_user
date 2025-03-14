import Home from "../pages/Home/Homepage";
import Auth from "../pages/Auth/";
import ProductDetail from "../pages/ProductDetail";
import CheckoutPage from "../pages/Checkout";
import CheckOut from "../pages/Order/CheckOut";
import DefaultLayout from "../components/layout/DefaultLayout";

//Public
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/auth", component: Auth, Layout: null },
  { path: "/products/:slug", component: ProductDetail, Layout: DefaultLayout },
  { path: "/checkout", component: CheckOut, Layout: DefaultLayout },
];

//Private
const privateRoute = [];

export { publicRoutes, privateRoute };
