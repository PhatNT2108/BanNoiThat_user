import Header from "../components/Header";
import Footer from "../components/Footer";
import { memo } from "react";

function DefaultLayout({ children }) {
  console.log("test rerender");

  return (
    <div className="relative ">
      <Header />
      <div className="py-3">{children}</div>
      <Footer />
    </div>
  );
}

export default memo(DefaultLayout);
