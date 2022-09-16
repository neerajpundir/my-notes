const db = require("../connection/mySqlConn");
const Notes = db.notes;

/**
 * Add Notes
 */
module.exports.addNotes = async (_req, _res, _next) => {
  try {
    const { title, mynotes } = _req.body;
    const mynote = await Notes.create({
      title: title,
      notes: mynotes,
    });

    _res.json({
      status: 200,
      mynote,
    });
  } catch (error) {
    _next(error);
  }
};

/**
 * Get All Notes
 */
module.exports.getAllNotes = async (_req, _res, _next) => {
  try {
    const data = await Notes.findAll({});
    let notes = data.sort((f, s) => s.id - f.id);
    _res.json({
      status: 200,
      notes,
    });
  } catch (error) {
    _next(error);
  }
};

/**
 * Get Single Note
 */
module.exports.getNote = async (_req, _res, _next) => {
  try {
    const { id } = _req.params;
    const notes = await Notes.findOne({
      where: { id: id },
    });

    _res.json({
      status: 200,
      notes,
    });
  } catch (error) {
    _next(error);
  }
};

/**
 * Update Notes
 */
module.exports.updateNotes = async (_req, _res, _next) => {
  try {
    const { id } = _req.params;
    const { mynotes } = _req.body;
    const value = { notes: mynotes };
    var condition = { where: { id: id } };

    const notes = await Notes.update(value, condition);

    _res.json({ status: 200, notes });
  } catch (error) {
    _next(error);
  }
};

/**
 *
 */
module.exports.deleteNotes = async (_req, _res, _next) => {
  try {
    const { id } = _req.params;
    const { mynotes } = _req.body;

    const notes = await Notes.destroy({
      where: { id: id },
    });

    _res.json({
      status: 200,
      notes,
    });
  } catch (error) {}
};
