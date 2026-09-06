const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    game: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      required: true
    },
    prize: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ["Programado", "Inscripciones", "Finalizado", "Cancelado"],
      default: "Programado"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tournament", tournamentSchema);
