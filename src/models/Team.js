const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    tag: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      maxlength: 5
    },
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player"
      }
    ],
    status: {
      type: String,
      enum: ["Activo", "Inactivo", "Disuelto"],
      default: "Activo"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
