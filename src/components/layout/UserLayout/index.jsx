import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import ChatBox from "../Chatbox";
import Header from "../components/Header";

function UseLayout({ children }) {
  return (
    <div className="relative ">
      <Header />
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
