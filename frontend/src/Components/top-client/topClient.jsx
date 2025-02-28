import React, { useEffect, useState } from "react";
import { getTopClient } from "../API/apiCalls";
import "./topClient.scss";

const TopClient = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTopClient();
        setData(res.topClient);
      } catch (error) {
        console.log("Failed to fetch top clients:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="cards-container">
      {data.length > 0 ? (
        data.map((client) => (
          <div key={client._id} className="client-card">
            <p>
              <strong>Agency Name:</strong> {client.agencyId?.agencyName}
            </p>
            <p>
              <strong>Client Name:</strong> {client.clientName}
            </p>
            <p>
              <strong>Total Bill:</strong> {client.totalBill}
            </p>
          </div>
        ))
      ) : (
        <p>No Data Found</p>
      )}
    </div>
  );
};

export default TopClient;
