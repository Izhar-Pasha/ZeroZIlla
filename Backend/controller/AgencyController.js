import Agency from "../models/AgencyModel.js";
import Client from "../models/ClientModel.js";

export const CreateAgency = async (req, res) => {
  try {
    const {
      agencyName,
      address1,
      address2,
      state,
      city,
      phoneNumber,
      clientName,
      clientEmail,
      clientPhone,
      totalBill,
    } = req.body;

    const { id: userId } = req.user;

    if (
      !agencyName ||
      !address1 ||
      !state ||
      !city ||
      !phoneNumber ||
      !clientName ||
      !clientEmail ||
      !clientPhone ||
      !totalBill
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all the required credentials" });
    }

    const newAgency = new Agency({
      agencyName,
      address1,
      address2,
      state,
      city,
      phoneNumber,
      userId,
    });

    await newAgency.save();

    const newClient = new Client({
      clientName,
      clientEmail,
      clientPhone,
      totalBill,
      agencyId: newAgency._id,
    });

    await newClient.save();
    res.status(201).json({ message: "Successfully Added" });
  } catch (error) {
    console.error("failed to Add agency:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllAgencies = async (req, res) => {
  try {
    const agencies = await Agency.find();
    res.status(200).json(agencies);
  } catch (error) {
    console.error("Failed to get agencies:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().populate("agencyId");
    res.status(200).json(clients);
  } catch (error) {
    console.error("Failed to get clients:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSingleClient = async (req, res) => {
  try {
    const clients = await Client.findById();
    res.status(200).json(clients);
  } catch (error) {
    console.error("Failed to get clients:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { clientName, clientEmail, clientPhone, totalBill } = req.body;

    const updateclient = await Client.findByIdAndUpdate(
      clientId,
      { clientName, clientEmail, clientPhone, totalBill },
      { new: true }
    );

    if (!updateclient)
      return res.status(404).json({ message: "Client not found" });

    res.status(200).json({ message: "Successfully updated", updateclient });
  } catch (error) {
    console.error("failed to update client:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getClient = async (req, res) => {
  try {
    const topClient = await Client.find()
      .sort({ totalBill: -1 })
      .populate("agencyId");

    res.status(200).json({ topClient });
  } catch (error) {
    console.error("failed to get top-client:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
