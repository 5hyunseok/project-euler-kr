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
  });

  // problem.associate = (models) => {
  //   // models.user.hasMany(models.real_time_qna, { foreignKey: 'user_id' });
  // };

  return problem;
};
