import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  agencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agency",
    required: true,
  },
  clientName: {
    type: String,
    required: [true, "ClientName is required"],
    trim: true,
  },
  clientEmail: {
    type: String,
    required: [true, "Client email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  clientPhone: {
    type: String,
    required: [true, "Number is required"],
    minLength: [10, "Number should be at least 10 digits long"],
    maxLength: [15, "Number should be at most 15 digits long"],
  },
  totalBill: {
    type: Number,
    required: [true, "Total Bill is required"],
  },
});

const Client = mongoose.model("Client", ClientSchema);
export default Client;
