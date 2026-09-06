const Game = require("../models/Game");

const getGames = async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener videojuegos", error: error.message });
  }
};

const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Videojuego no encontrado" });
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: "Error al consultar videojuego" });
  }
};

const createGame = async (req, res) => {
  try {
    const game = await Game.create(req.body);
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ message: "Error al crear videojuego", error: error.message });
  }
};

const updateGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!game) return res.status(404).json({ message: "Videojuego no encontrado" });
    res.json(game);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar videojuego", error: error.message });
  }
};

const deleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ message: "Videojuego no encontrado" });
    res.json({ message: "Videojuego eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar videojuego" });
  }
};

module.exports = { getGames, getGameById, createGame, updateGame, deleteGame };
