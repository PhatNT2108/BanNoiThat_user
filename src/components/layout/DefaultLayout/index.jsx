import Header from "../components/Header";
import Footer from "../components/Footer";
import { memo } from "react";
import ChatBox from "../Chatbox";

function DefaultLayout({ children }) {
  console.log("test rerender");

  return (
    <div className="relative ">
      <Header />
      <div className="py-3">{children}</div>
      <ChatBox />
      <Footer />
    </div>
  );
}

export default memo(DefaultLayout);
