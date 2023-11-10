import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import useProductStore from "../store/ProductsStore";
import ProductListComponent from "./ProductListComponent";
export default function Navbar() {
  const cart = useContext(CartContext);

  const productStore = useProductStore();

  useEffect(() => {
    // Appel de la fonction au montage du composant
    productStore.fetchProductData(2);
  }, []);

  useEffect(() => {
    // Affichage des données dès qu'elles sont disponibles
    console.log(productStore.productData);
  }, [productStore.productData]);

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const totalQuantity = cart.getTotalQuantity();
  /*   const totalCost = cart.getTotalCost(); */

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" to="/">
            The Bradery
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {totalQuantity}
                </span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">{totalQuantity} Items</span>
                {/*              <span className="text-info">Subtotal: {totalCost}</span> */}
                <div className="card-actions">
                  <Link className="btn btn-primary btn-block" to="/cart">
                    View cart
                  </Link>
                  {/*  {productsCount > 0 ? (
                    <>
                      <p>Items in your cart:</p>
                      <ProductListComponent
                        productStore={productStore}
                        cart={cart}
                      />
                    </>
                  ) : (
                    <h1>There are no items in your cart!</h1>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
