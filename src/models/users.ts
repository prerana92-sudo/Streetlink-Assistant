import { model, Schema } from "mongoose";

const publicUserSchema = new Schema(
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
    recieveUpdates: {
      type: Boolean,
      required: false,
    },
    recieveNews: {
      type: Boolean,
      required: false,
    },
    hearOpportunities: {
      type: Boolean,
      required: false,
    },
    shareDetails: {
      type: Boolean,
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

const publicUsers = model("publicUsers", publicUserSchema);

export default publicUsers;
