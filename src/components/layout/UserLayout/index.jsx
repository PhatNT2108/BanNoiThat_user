import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import HeaderShort from "../components/HeaderShort";
import ChatBox from "../Chatbox";

function UseLayout({ children }) {
  return (
    <div className="relative ">
      <HeaderShort />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
      <ChatBox />
      <Footer />
    </div>
  );
}

export default UseLayout;
