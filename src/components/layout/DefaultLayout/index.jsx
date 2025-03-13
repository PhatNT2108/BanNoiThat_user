import Footer from "./components/Footer/Footer";
import Header from "./components/Header";
import Navigation from "./components/Navigation";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <Navigation />
      <div className="py-3">{children}</div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
