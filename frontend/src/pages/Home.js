import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    axios
      .get("/api")
      .then(function (response) {
        console.log(response);
        setBackendData(response.data.users); // Assurez-vous d'accéder à response.data pour obtenir les données
      })
      .catch(function (error) {
        // handle error
        console.error(error); // Utilisez "console.error" pour les erreurs
      });
  }, []);

  return (
    <div className="flex h-screen justify-center items-center text-center bg-slate-200 flex-col">
      <div>VOICI LA HOME PAGE</div>
      <div>Données du backend : {backendData}</div>
    </div>
  );
}
