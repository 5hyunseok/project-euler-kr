module.exports = (sequelize, DataTypes) => {
  const submit = sequelize.define('submit', {
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    solve_flag: {
      type: DataTypes.TINYINT,
    },
    pending_flag: {
      type: DataTypes.TINYINT,
    },
  }, {
    underscored: true,
  });

  submit.associate = (models) => {
    models.submit.belongsTo(models.user);
    models.submit.belongsTo(models.problem);
  };

  return submit;
};
