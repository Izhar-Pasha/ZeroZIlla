import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ClientEdit.scss";
import { updateClient, getClientById } from "../API/apiCalls.js";

const ClientEdit = () => {
  const { clientId } = useParams();
  console.log("Client ID from URL:", clientId);

  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    totalBill: "",
  });

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const clientData = await getClientById(clientId);
        if (clientData) {
          setFormData({
            clientName: clientData.clientName || "",
            clientEmail: clientData.clientEmail || "",
            clientPhone: clientData.clientPhone || "",
            totalBill: clientData.totalBill || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch client:", error);
      }
    };

    fetchClient();
  }, [clientId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.clientName ||
      !formData.clientEmail ||
      !formData.clientPhone ||
      !formData.totalBill
    ) {
      alert("Please fill in all required fields!");
      return;
    }
    try {
      const response = await updateClient(clientId, formData);
      console.log("Client Updated Successfully", response);
      alert("Client updated successfully!");
    } catch (error) {
      console.error("Update Failed:", error.message);
      alert("Failed to update client");
    }
  };

  return (
    <div id="editClient" className="edit-client-container">
      <div id="prev" className="back-link">
        <Link to="/Clients">Back</Link>
      </div>
      <form onSubmit={handleSubmit} className="client-form">
        <label>Client Name *</label>
        <input
          type="text"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          required
        />

        <label>Client Email *</label>
        <input
          type="email"
          name="clientEmail"
          value={formData.clientEmail}
          onChange={handleChange}
          required
        />

        <label>Client Phone *</label>
        <input
          type="tel"
          name="clientPhone"
          value={formData.clientPhone}
          onChange={handleChange}
          required
        />

        <label>Total Bill *</label>
        <input
          type="number"
          name="totalBill"
          value={formData.totalBill}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-button">
          Update Client
        </button>
      </form>
    </div>
  );
};

export default ClientEdit;
