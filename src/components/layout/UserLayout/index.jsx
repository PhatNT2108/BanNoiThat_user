import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/Chatbox";
import Header from "../components/Header";
import React, { createRef, useEffect, useRef } from "react";

const UseLayout = ({ children }) => {
  const goTop = useRef(null);

  useEffect(() => {
    goTop.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="relative">
      <Header />
      <div ref={goTop} />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
      <ChatBox />
      <Footer />
    </div>
  );
};

export default UseLayout;
