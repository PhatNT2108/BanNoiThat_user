import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ChatbotRecommend from "../components/ChatbotBox";
import SectionCategories from "../components/SectionCategory";

function DefaultLayout({ children }) {
  return (
    <div className="relative ">
      <Header />
      <div className="py-3">{children}</div>
      <ChatbotRecommend />
      <Footer />
    </div>
  );
}

export default DefaultLayout;
