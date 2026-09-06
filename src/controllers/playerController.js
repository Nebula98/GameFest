const Player = require("../models/Player");

const getPlayers = async (req, res) => {
  try {
    const players = await Player.find().sort({ createdAt: -1 });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener jugadores", error: error.message });
  }
};

const getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: "Jugador no encontrado" });
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: "Error al consultar jugador" });
  }
};

const createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ message: "Error al crear jugador", error: error.message });
  }
};

const updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!player) return res.status(404).json({ message: "Jugador no encontrado" });
    res.json(player);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar jugador", error: error.message });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) return res.status(404).json({ message: "Jugador no encontrado" });
    res.json({ message: "Jugador eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar jugador" });
  }
};

module.exports = {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer
};
