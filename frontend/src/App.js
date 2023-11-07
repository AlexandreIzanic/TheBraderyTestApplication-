import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  return (
    <div className="App flex flex-col h-screen bg-base-100">
      <Navbar />

      <Routes>
        <>
          <Route index path="/" element={<Home />} />
          <Route index path="/cart" element={<Cart />} />
        </>
      </Routes>
    </div>
  );
}

export default App;
