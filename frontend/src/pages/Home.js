import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    axios
      .get("/products")
      .then(function (response) {
        console.log(response.data.products);
        setBackendData(response.data.products); // Assurez-vous d'accéder à response.data pour obtenir les données
      })
      .catch(function (error) {
        // handle error
        console.error(error); // Utilisez "console.error" pour les erreurs
      });
  }, []);

  const renderedData = backendData.map((product) => (
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

      <button className="buttonBase">Add</button>
    </tr>
  ));

  return (
    <div className="flex  justify-center items-center text-center  flex-col">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>inventory</th>
          </tr>
        </thead>

        {renderedData}
      </table>
    </div>
  );
}
