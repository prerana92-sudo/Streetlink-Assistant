import  { Schema, model, Document, Types } from "mongoose";

interface IAlert extends Document {}

const locationSchema = {
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  _id: false
};

const alertSchema = new Schema(
  {
    alertId: {
      type: String,
      required: true,
    },
    alertCreatedBy: {
      type: String,
      enum: ["Member of Public", "Self"],
      required: true,
    },
    localAuthority: {
      type: String,
      required: true,
    },
    location: {
      type: locationSchema,
      required: true,
    },
    locationDescription: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status:{
       type: String,
       enum:['Open','New'],
       required: false
    },
    roughSleeperDetails: {
      type: Types.ObjectId,
      ref: "roughSleepers",
      required: true,
    },
    userDetails: {
      type: Types.ObjectId,
      ref: "publicUsers",
      required: false,
      allowNull: true
    },
    isPetAlong: {
      type: Boolean,
      default: false,
      required: false,
    },
    petData: {
      type: Types.ObjectId,
      ref: "pets",
      required: false,
      allowNull: true
    },
  },
  {
    timestamps: true,
  }
);

const Alerts =  model("Alerts", alertSchema);

export default Alerts;
