import HomePage from "../pages/Home/Homepage";
import AuthPage from "../pages/Auth/";
import ProductDetail from "../pages/ProductDetail";
import CheckOutPage from "../pages/Checkout/CheckOut";
import InformationUserPage from "../pages/InformationUser";
import DefaultLayout from "../components/layout/DefaultLayout";
import UserLayout from "../components/layout/UserLayout";
import MangeOrderPage from "../pages/Order";

//Public
const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/auth", component: AuthPage, Layout: null },
  { path: "/products/:slug", component: ProductDetail, Layout: DefaultLayout },
  { path: "/checkout", component: CheckOutPage, Layout: DefaultLayout },
  { path: "/information", component: InformationUserPage, Layout: UserLayout },
  { path: "/orders", component: MangeOrderPage, Layout: UserLayout },
];

//Private
const privateRoute = [];

export { publicRoutes, privateRoute };
