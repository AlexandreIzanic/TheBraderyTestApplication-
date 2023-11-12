import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import CartProvider from "./context/CartContext";
import CheckoutSuccess from "./pages/CheckoutSuccess";
function App() {
  return (
    <CartProvider>
      <div className="App flex flex-col h-screen bg-base-100">
        <Navbar />

        <Routes>
          <>
            <Route index path="/" element={<Home />} />
            <Route index path="/cart" element={<Cart />} />
            <Route index path="/success" element={<CheckoutSuccess />} />
          </>
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
