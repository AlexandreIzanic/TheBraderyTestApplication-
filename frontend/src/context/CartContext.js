import React, { createContext, useState } from "react";
import fetchProductData from "../store/ProductsStore"; // Assuming fetchProductData is the correct function

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
  getTotalQuantity: () => {},
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  // Function to get the quantity of a product in the cart
  function getProductQuantity(id) {
    const product = cartProducts.find((product) => product.id === id);
    return product ? product.quantity : 0;
  }

  // Function to add one item to the cart
  function addOneToCart(id) {
    const existingProduct = cartProducts.find((product) => product.id === id);

    if (!existingProduct) {
      // Product is not in the cart
      setCartProducts([...cartProducts, { id, quantity: 1 }]);
    } else {
      // Product is already in the cart
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }

  // Function to remove one item from the cart
  function removeOneFromCart(id) {
    const existingProduct = cartProducts.find((product) => product.id === id);

    if (existingProduct && existingProduct.quantity === 1) {
      // If the quantity is 1, remove the product from the cart
      deleteFromCart(id);
    } else {
      // Decrease the quantity by 1
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  // Function to delete a product from the cart
  function deleteFromCart(id) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((product) => product.id !== id)
    );
  }

  // Function to calculate the total cost of items in the cart
  function getTotalCost() {
    return cartProducts.reduce((total, cartItem) => {
      const productData = fetchProductData(cartItem.id);
      return total + productData.price * cartItem.quantity;
    }, 0);
  }

  function getTotalQuantity() {
    return cartProducts.reduce((totalQuantity, cartItem) => {
      return totalQuantity + cartItem.quantity;
    }, 0);
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
    getTotalQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
