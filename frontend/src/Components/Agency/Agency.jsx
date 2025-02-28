import React, { useEffect, useState } from "react";
import "./Agency.scss";
import { Link } from "react-router-dom";
import { getAgency } from "../API/apiCalls";

const Agency = () => {
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const res = await getAgency();
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
        <Link to="/agencies/Create">
          <button>Create Agency</button>
        </Link>
      </div>

      <div id="agencies" className="agencies-container">
        {data?.length ? (
          data.map((agency) => (
            <div key={agency._id} className="agency-card">
              <p>
                <strong>Agency Name:</strong> {agency.agencyName}
              </p>
              <p>
                <strong>Address:</strong> {agency.address1}
              </p>
              <p>
                <strong>State:</strong> {agency.state}
              </p>
              <p>
                <strong>City:</strong> {agency.city}
              </p>
              <p>
                <strong>Phone Number:</strong> {agency.phoneNumber}
              </p>
            </div>
          ))
        ) : (
          <p>No Agency found</p>
        )}
      </div>
    </div>
  );
};

export default Agency;
