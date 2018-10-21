module.exports = (sequelize, DataTypes) => {
  const problem = sequelize.define('problem', {
    title: {
      type: DataTypes.TEXT,
    },
    problem: {
      type: DataTypes.TEXT,
    },
    title_kr: {
      type: DataTypes.TEXT,
    },
    problem_kr: {
      type: DataTypes.TEXT,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
    solver: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    underscored: true,
    timestamps: false,
  });

  problem.associate = (models) => {
    models.problem.hasMany(models.submit, { as: 'submits' });
    models.problem.hasMany(models.submit, { as: 'pending_submits' });
    models.problem.hasMany(models.translateSubmit);
    models.problem.hasOne(models.answer, { onDelete: 'cascade', foreignKey: 'problem_id' });
    models.problem.hasMany(models.thread);
  };

  return problem;
};
