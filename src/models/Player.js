const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    },
    ranking: {
      type: Number,
      default: 0,
      min: 0
    },
    status: {
      type: String,
      enum: ["Activo", "Inactivo"],
      default: "Activo"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Player", playerSchema);
