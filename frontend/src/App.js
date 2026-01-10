import Home from './pages/Home';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductDetail from "./pages/ProductDetail";
import  { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';

function App() {


  const [cartItems, setCartItems] = useState([]);
  return (
    <div className="App">
      
      <Router>
        <ToastContainer theme='dark' position='top-center' /> 
        <Header  cartItems={cartItems}/>
           <div>
              <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/search' element={<Home />} />
                  <Route path='/product/:id' element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />} />
                  <Route path='/cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
               </Routes>
             </div>
      </Router>
    <Footer />
    </div>
  );
}

export default App;
