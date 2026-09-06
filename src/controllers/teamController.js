const Team = require("../models/Team");

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate("captain", "nickname fullName email")
      .populate("members", "nickname fullName email")
      .sort({ createdAt: -1 });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener equipos", error: error.message });
  }
};

const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("captain", "nickname fullName email")
      .populate("members", "nickname fullName email");
    if (!team) return res.status(404).json({ message: "Equipo no encontrado" });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Error al consultar equipo" });
  }
};

const createTeam = async (req, res) => {
  try {
    const team = await Team.create(req.body);
    const populatedTeam = await Team.findById(team._id)
      .populate("captain", "nickname fullName email")
      .populate("members", "nickname fullName email");
    res.status(201).json(populatedTeam);
  } catch (error) {
    res.status(400).json({ message: "Error al crear equipo", error: error.message });
  }
};

const updateTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .populate("captain", "nickname fullName email")
      .populate("members", "nickname fullName email");
    if (!team) return res.status(404).json({ message: "Equipo no encontrado" });
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar equipo", error: error.message });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ message: "Equipo no encontrado" });
    res.json({ message: "Equipo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar equipo" });
  }
};

module.exports = {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam
};
