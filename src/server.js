require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const gameRoutes = require("./routes/gameRoutes");
const tournamentRoutes = require("./routes/tournamentRoutes");
const playerRoutes = require("./routes/playerRoutes");
const teamRoutes = require("./routes/teamRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "GameFest API funcionando correctamente" });
});

app.use("/api/games", gameRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/teams", teamRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
