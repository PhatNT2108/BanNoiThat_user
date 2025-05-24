import Header from "../components/Header";
import Footer from "../components/Footer";
import { memo, useEffect, useRef } from "react";
import ChatBox from "../components/Chatbox";

function DefaultLayout({ children }) {
  const goTop = useRef(null);

  useEffect(() => {
    goTop.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="relative ">
      <Header />
      <div ref={goTop} />
      <div className="py-3">{children}</div>
      <ChatBox />
      <Footer />
    </div>
  );
}

export default memo(DefaultLayout);
