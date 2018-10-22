module.exports = (sequelize, DataTypes) => {
  const translateSubmit = sequelize.define('translateSubmit', {
    comment: {
      type: DataTypes.TEXT,
    },
    title_kr: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    problem_kr: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    check_flag: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
  }, {
    underscored: true,
    tableName: 'translate_submit',
  });

  translateSubmit.associate = (models) => {
    models.translateSubmit.belongsTo(models.user);
    models.translateSubmit.belongsTo(models.problem);
  };

  return translateSubmit;
};
