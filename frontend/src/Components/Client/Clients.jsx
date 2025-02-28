import React, { useEffect, useState } from "react";
import "./Clients.scss";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { getClients } from "../API/apiCalls";

const Client = () => {
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const res = await getClients();
      console.log("res:", res);
      setData(res);
    } catch (error) {
      console.log("Failed to fetch agencies:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div id="manage">
        <button onClick={fetchData}>Refresh</button>
      </div>

      <div id="agencies" className="agencies-container">
        {data?.length ? (
          data.map((client) => (
            <div key={client._id} className="agency-card">
              <p>
                <strong>Agency Name:</strong> {client.agencyId?.agencyName}
              </p>
              <p>
                <strong>Client Name:</strong> {client.clientName}
              </p>
              <p>
                <strong>Client Email:</strong> {client.clientEmail}
              </p>
              <p>
                <strong>Client Phone:</strong> {client.clientPhone}
              </p>
              <p>
                <strong>Total Bill:</strong> {client.totalBill}
              </p>
              <div className="icons">
                <Link to={`/Clients/${client._id}`}>
                  <MdModeEditOutline />
                </Link>
                <i>
                  <MdDelete />
                </i>
              </div>
            </div>
          ))
        ) : (
          <p>No Agency found</p>
        )}
      </div>
    </div>
  );
};

export default Client;
