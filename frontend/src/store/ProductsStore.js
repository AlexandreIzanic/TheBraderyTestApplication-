import create from "zustand";
import axios from "axios";

const useProductStore = create((set) => ({
  products: null,
  productData: null,

  fetchProducts: async (props) => {
    try {
      const res = await axios.get("/products", {
        headers: {
          ...props,
        },
      });

      set({
        products: res.data.products,
      });
    } catch (error) {
      console.error(error);
    }
  },

  fetchProductData: async (id) => {
    try {
      const res = await axios.get(`/products/${id}`);
      set((state) => ({
        productData: res.data.products,
      }));
    } catch (error) {
      // Handle errors if necessary
      console.error("Error fetching user:", error);
    }
  },
}));

export default useProductStore;
