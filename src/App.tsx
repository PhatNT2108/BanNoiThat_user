import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Home/Homepage';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import CheckOut from './pages/Order/CheckOut';
import Cart from './pages/Cart/Cart';

const App: React.FC = () => {
  return (
    <div className="grid grid-rows-[1fr_11fr] grid-cols-1 h-screen">
      <Router>
        <Header/>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Homepage />} />
          <Route path='/productDetail' element={<ProductDetail />} />
          <Route path='/checkout' element={<CheckOut />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
};

export default App;
