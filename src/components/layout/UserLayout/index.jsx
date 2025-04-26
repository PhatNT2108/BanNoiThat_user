import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import HeaderShort from "../components/HeaderShort";

function UseLayout({ children }) {
  return (
    <div className="relative ">
      <HeaderShort />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default UseLayout;
