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

    // Ajouter le prix du produit au totalCount
    totalCount += product.price * productQuantity;
  });

  // Round to two decimal places and convert to number for display
  const roundedTotalCount = Number(totalCount.toFixed(2));

  return (
    <>
      {productsInCart.map((product) => {
        const productQuantity = cart.getProductQuantity(product.id);

        return (
          <tr className="hover" key={product.id}>
            <th className="">{product.name}</th>
            <th className="font-medium">{product.price}</th>
            <th className="font-medium">{productQuantity}</th>
            <th className="font-medium">{product.price * productQuantity}</th>
          </tr>
        );
      })}

      <div className="flex w-[600px] justify-between fixed mt-10 ">
        <p>Total: {roundedTotalCount}€</p>
        <btn className="buttonBase">Checkout</btn>
      </div>
    </>
  );
}

export default ProductListComponent;
