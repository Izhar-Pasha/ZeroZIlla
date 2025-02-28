import mongoose from "mongoose";

const AgencySchema = new mongoose.Schema({
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  agencyName: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  address1: {
    type: String,
    required: [true, "Address is required"],
  },
  address2: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: [true, "State is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Number is required"],
    minLength: [10, "Number should be at least 10 digits long"],
    maxLength: [15, "Number should be at most 15 digits long"],
  },
});

const Agency = mongoose.model("Agency", AgencySchema);
export default Agency;
