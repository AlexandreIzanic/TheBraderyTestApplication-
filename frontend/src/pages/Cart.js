import { useContext } from "react";
import ProductListComponent from "../components/ProductListComponent";
import { CartContext } from "../context/CartContext";
import useProductStore from "../store/ProductsStore";

export default function Cart() {
  const cart = useContext(CartContext);
  const productStore = useProductStore();
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
      </table>
    </div>
  );
}
