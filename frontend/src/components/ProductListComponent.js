import axios from "axios";
import React from "react";

function ProductListComponent({ productStore, cart }) {
  let totalCount = 0;

  // Check if productStore and productStore.products are defined
  if (!productStore || !productStore.products) {
    return <p>Pas de produit</p>;
  }

  const productsInCart = productStore.products.filter((product) =>
    cart.items.some((cartItem) => cartItem.id === product.id)
  );

  if (productsInCart.length === 0) {
    return <p>Pas de produit</p>;
  }

  productsInCart.forEach((product) => {
    const productQuantity = cart.getProductQuantity(product.id);

    // Add Price of Product into Total
    totalCount += product.price * productQuantity;
  });

  // Round to two decimal places and convert to number for display
  const roundedTotalCount = Number(totalCount.toFixed(2));

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
    <>
      {productsInCart.map((product) => {
        const productQuantity = cart.getProductQuantity(product.id);

        return (
          <tr className="hover" key={product.id}>
            <th className="">{product.name}</th>
            <th className="font-medium">{product.price}</th>
            <th className="font-medium">{productQuantity}</th>
            <th className="font-medium">
              {parseFloat((product.price * productQuantity).toFixed(2))}
            </th>
          </tr>
        );
      })}

      <div className="flex w-[600px] justify-between fixed mt-10 ">
        <p>Total: {roundedTotalCount}€</p>
        <button className="buttonBase" type="submit" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </>
  );
}

export default ProductListComponent;
