import DefaultLayout from "../components/layout/DefaultLayout";
import UserLayout from "../components/layout/UserLayout";
import ShortHeaderLayout from "../components/layout/ShortHeaderLayout";
import HomePage from "../pages/Home/Homepage";
import AuthPage from "../pages/Auth/";
import ProductDetail from "../pages/ProductDetail";
import CheckOutPage from "../pages/Checkout";
import InformationUserPage from "../pages/InformationUser/InformationUserPage";
import MangeOrderPage from "../pages/Order";
import AddressUser from "../pages/InformationUser/FavoriteUser";
import FilteredProductPage from "../pages/Home/FilteredProductPage";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage";
import NonHeaderLayout from "../components/layout/NonHeaderLayout";
import PaymentSuccess from "../pages/Status/SuccessfulPay";
import ResetPassword from "../pages/Auth/ResetPasswordPage";
import ResetPasswordForm from "../pages/InformationUser/ChangePasswordPage";

//Public
const publicRoutes = [
  { path: "/", component: HomePage },
  {
    path: "/collections/",
    component: FilteredProductPage,
    Layout: DefaultLayout,
  },
  {
    path: "/collections/:slug",
    component: FilteredProductPage,
    Layout: DefaultLayout,
  },
  { path: "/auth", component: AuthPage, Layout: null },
  {
    path: "/products/:slug",
    component: ProductDetail,
    Layout: ShortHeaderLayout,
  },
  { path: "/checkout", component: CheckOutPage, Layout: NonHeaderLayout },
  { path: "/information", component: InformationUserPage, Layout: UserLayout },
  { path: "/orders", component: MangeOrderPage, Layout: UserLayout },
  {
    path: "/change-password",
    component: ResetPasswordForm,
    Layout: UserLayout,
  },
  { path: "/address", component: AddressUser, Layout: UserLayout },
  {
    path: "/forgot-password",
    component: ForgotPasswordPage,
    Layout: null,
  },
  {
    path: "/payment-successful",
    component: PaymentSuccess,
    Layout: NonHeaderLayout,
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    Layout: NonHeaderLayout,
  },
];

//Private
const privateRoute = [];

export { publicRoutes, privateRoute };
