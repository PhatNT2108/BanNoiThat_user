import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ChatbotRecommend from "../components/Chatbox";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <Navigation />
      <div className="py-3">{children}</div>
      <div className="sticky inline right-0 bottom-0 ">
        <ChatbotRecommend />
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
