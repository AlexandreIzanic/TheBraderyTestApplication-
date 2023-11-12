import { useState, useEffect } from "react";
import useProductStore from "../store/ProductsStore";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export default function TableProducts() {
  const productStore = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    productStore.fetchProducts();
  }, []);

  const filteredProducts = productStore.products
    ? productStore.products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  console.log(productStore.products);
  const cart = useContext(CartContext);

  console.log(productStore.productData);
  console.log(cart.items);

  const renderedData = filteredProducts.length ? (
    filteredProducts.map((product) => {
      const productQuantity = cart.getProductQuantity(product.id);

      return (
        <tr className="hover" key={product.id}>
          <th className="font-light">{product.id}</th>
          <th className="">{product.name}</th>
          <th className="font-medium">{product.price}</th>
          <th
            className={`font-medium ${
              product.inventory < 25
                ? "text-red-500"
                : product.inventory <= 50
                ? "text-yellow-500"
                : ""
            }`}
          >
            {product.inventory}
          </th>

          {productQuantity === 0 ? (
            <button
              onClick={() =>
                cart.addOneToCart(product.id, product.name, product.price)
              }
              className="buttonBase"
            >
              Add To Cart
            </button>
          ) : (
            <>
              <button
                className="buttonBase"
                onClick={() => cart.removeOneFromCart(product.id)}
              >
                -
              </button>
              <span>{productQuantity} in cart</span>
              {productQuantity < product.inventory ? (
                <button
                  className="buttonBase"
                  onClick={() => cart.addOneToCart(product.id)}
                >
                  +
                </button>
              ) : (
                <button
                  disabled
                  className="buttonBase bg-red-400"
                  onClick={() => cart.addOneToCart(product.id)}
                >
                  +
                </button>
              )}

              <button onClick={() => cart.deleteFromCart(product.id)}>
                Remove
              </button>
            </>
          )}
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="5">No matching products found.</td>
    </tr>
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-3 p-2"
      />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Inventory</th>
          </tr>
        </thead>
        {renderedData}
      </table>
    </div>
  );
}
