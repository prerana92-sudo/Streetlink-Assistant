import { Schema, model } from "mongoose";

const roughSleeperSchema = new Schema(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    ageGroup: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    appearance: {
      type: String,
      required: true,
    },
    issues: {
      type: String,
      required: false,
    },
    isAllowingContact: {
      type: Boolean,
      default: false,
      required: false,
    },
    isNewRoughSleeper: {
      type: Boolean,
      default: false,
      required: false,
    },
    shareInfoWithStreetvet: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const roughSleepers = model("roughSleepers", roughSleeperSchema);

export default roughSleepers;
