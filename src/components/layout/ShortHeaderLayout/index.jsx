import Footer from "../components/Footer";
import HeaderShort from "../components/HeaderShort";

function ShortHeaderLayout({ children }) {
  return (
    <div className="relative ">
      <HeaderShort />
      <div className="flex">
        <div className="flex-1">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default ShortHeaderLayout;
