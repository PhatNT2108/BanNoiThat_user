import Footer from "../components/Footer";
import Header from "../components/Header";

function ShortHeaderLayout({ children }) {
  return (
    <div className="relative ">
      <Header />
      <div className="flex">
        <div className="flex-1">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default ShortHeaderLayout;
