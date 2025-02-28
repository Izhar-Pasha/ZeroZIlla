import { useState } from "react";
import "./CreateAgency.scss";
import { Link } from "react-router-dom";
import { newAgency } from "../API/apiCalls";

const CreateAgencyForm = () => {
  const [formData, setFormData] = useState({
    agencyName: "",
    address1: "",
    address2: "",
    state: "",
    city: "",
    phoneNumber: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    totalBill: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.agencyName ||
      !formData.address1 ||
      !formData.state ||
      !formData.city ||
      !formData.phoneNumber ||
      !formData.clientName ||
      !formData.clientEmail ||
      !formData.clientPhone ||
      !formData.totalBill
    ) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      const response = await newAgency(formData);
      console.log("Agency & Client Created Successfully", response);

      // Reset form after successful submission
      setFormData({
        agencyName: "",
        address1: "",
        state: "",
        city: "",
        phoneNumber: "",
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        totalBill: "",
      });

      return response;
    } catch (error) {
      console.error("Failed to create Agency & Client:", error.message);
    }
  };

  return (
    <div id="createAgency">
      <div id="prev">
        <Link to="/Agencies">Back</Link>
      </div>
      <form onSubmit={handleSubmit} className="agency-form">
        <h2>Create Agency</h2>
        <label>Agency Name *</label>
        <input
          type="text"
          name="agencyName"
          value={formData.agencyName}
          onChange={handleChange}
          required
        />

        <label>Address 1 *</label>
        <input
          type="text"
          name="address1"
          value={formData.address1}
          onChange={handleChange}
          required
        />

        <label>Address 2 (Optional)</label>
        <input
          type="text"
          name="address2"
          value={formData.address2}
          onChange={handleChange}
        />

        <label>State *</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />

        <label>City *</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <label>Phone Number *</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          pattern="[0-9]{10}"
          title="Enter a valid 10-digit phone number"
          required
        />

        <h2>Client Details</h2>
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
          pattern="[0-9]{10}"
          title="Enter a valid 10-digit phone number"
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

        <button type="submit">Create Agency & Client</button>
      </form>
    </div>
  );
};

export default CreateAgencyForm;
