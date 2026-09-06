const Tournament = require("../models/Tournament");

const getTournaments = async (req, res) => {
  try {
    res.json(await Tournament.find().sort({ createdAt: -1 }));
  } catch (error) {
    res.status(500).json({ message: "Error al obtener torneos", error: error.message });
  }
};

const getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) return res.status(404).json({ message: "Torneo no encontrado" });
    res.json(tournament);
  } catch (error) {
    res.status(500).json({ message: "Error al consultar torneo" });
  }
};

const createTournament = async (req, res) => {
  try {
    res.status(201).json(await Tournament.create(req.body));
  } catch (error) {
    res.status(400).json({ message: "Error al crear torneo", error: error.message });
  }
};

const updateTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!tournament) return res.status(404).json({ message: "Torneo no encontrado" });
    res.json(tournament);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar torneo", error: error.message });
  }
};

const deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndDelete(req.params.id);
    if (!tournament) return res.status(404).json({ message: "Torneo no encontrado" });
    res.json({ message: "Torneo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar torneo" });
  }
};

module.exports = {
  getTournaments,
  getTournamentById,
  createTournament,
  updateTournament,
  deleteTournament
};
