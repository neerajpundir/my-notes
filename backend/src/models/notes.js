module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define("notes", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return Notes;
};
