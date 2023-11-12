import { useContext } from "react";
import ProductListComponent from "../components/ProductListComponent";
import { CartContext } from "../context/CartContext";
import useProductStore from "../store/ProductsStore";
import axios from "axios";

export default function Cart() {
  const cart = useContext(CartContext);
  const productStore = useProductStore();

  const cartItems = cart.items;

  const handleCheckout = () => {
    axios
      .post(
        `/stripe/create-checkout-session`,
        { cartItems: cartItems },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className="flex min-w-[600px] m-auto h-full justify-center text-center flex-col">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <ProductListComponent productStore={productStore} cart={cart} />

        {/*         <form action="/stripe/create-checkout-session" method="POST"> */}
        <button type="submit" onClick={handleCheckout}>
          Checkout
        </button>
        {/*         </form> */}
      </table>
    </div>
  );
}
