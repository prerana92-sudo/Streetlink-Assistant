import { model, Schema } from "mongoose";

const petSchema = new Schema(
  {
    petName: {
      type: String,
      required: true,
    },
    petBreed: {
      type: String,
      required: true,
    },
    contactReason: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Pets = model("Pets", petSchema);

export default Pets;
