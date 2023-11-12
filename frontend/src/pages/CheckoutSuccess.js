import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CheckoutSuccess() {
  const [email, setEmail] = useState("");
  const [orderDetails, setOrderDetails] = useState([]);
  const handleViewOrderDetails = async () => {
    try {
      const response = await axios.get(`/orders/${email}`);
      setOrderDetails(response.data.orders);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  return (
    <div className="flex px-10 min-w-[600px] m-auto  justify-center items-center text-center flex-col">
      <h2>Thank you for your purchase</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-3 p-2"
      />
      <button className="btn mt-3" onClick={handleViewOrderDetails}>
        View My Order Details
      </button>

      <div>
        {/* Map through orders details and display them */}
        {orderDetails.length > 0 ? (
          <div>
            <h3>Your Order Details:</h3>
            {orderDetails.map((order) => (
              <div className="my-5" key={order.id}>
                <p>Email: {order.email}</p>
                <p>Address: {order.adresse}</p>
                <p>When: {new Date(order.date_creation).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No order details available.</p>
        )}
      </div>

      <Link className="btn mt-10 normal-case text-xl" to="/">
        Return To Home
      </Link>
    </div>
  );
}
