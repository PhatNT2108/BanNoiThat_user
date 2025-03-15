import Footer from "../components/Footer";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Sidebar from "../components/Sidebar";

function UseLayout({ children }) {
  return (
    <div className="relative ">
      <Header />
      <Navigation />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default UseLayout;
